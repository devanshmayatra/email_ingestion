import { NextResponse } from "next/server";
import { simpleParser } from "mailparser";
import fs from "fs-extra";
import path from "path";
import Imap from "imap-simple";
import prisma from "@/lib/prisma"; // Ensure Prisma is correctly imported


// ✅ Only allow POST requests
export async function POST(req: Request) {
  try {
    console.log("📩 Fetching emails via POST...");

    // Ensure the request body is valid JSON
    const body = await req.json();
    if (!body.config) {
      return NextResponse.json({ success: false, error: "Missing config parameter" }, { status: 400 });
    }

    await fetchEmailsViaIMAP(body.config);

    const emails = await prisma.emailAttachment.findMany();
    return NextResponse.json({ success: true, emails });
  } catch (error) {
    console.error("❌ Error fetching emails:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}

// // ❌ Reject GET requests
// export async function GET() {
//   return NextResponse.json({ success: false, error: "Method Not Allowed" }, { status: 405 });
// }

// ✅ Function to connect to IMAP and fetch emails
async function fetchEmailsViaIMAP(config: any) {
  const imapConfig = {
    imap: {
      user: config.username,
      password: config.password,
      host: config.host,
      port: config.port,
      tls: config.useSSL,
      authTimeout: 10000,
      tlsOptions: { "rejectUnauthorized": false }
    },
  };

  console.log(imapConfig);

  const connection = await Imap.connect(imapConfig);

  await connection.openBox("INBOX");

  const searchCriteria = ["UNSEEN"];
  const fetchOptions = { bodies: [""], struct: true };

  const messages = await connection.search(searchCriteria, fetchOptions);

  for (const message of messages) {
    const rawMail = await connection.getPartData(message, message.parts?.[0] || message.attributes.struct);

    const parsed = await simpleParser(rawMail);

    for (const attachment of parsed.attachments || []) {
      console.log("📌 Attachment Debug:", attachment);

      if (attachment.contentType === "application/pdf") {
        const fileName = attachment.filename || `attachment_${Date.now()}.pdf`; // ✅ Ensure filename is always defined

        const filePath = path.join(process.cwd(), "pdfs", fileName);
        await fs.writeFile(filePath, attachment.content);

        // Store metadata in the database
        await prisma.emailAttachment.create({
          data: {
            emailConfigId: config.id,
            fromAddress: parsed.from?.text || "Unknown",
            dateReceived: parsed.date || new Date(),
            subject: parsed.subject || "No Subject",
            attachmentFileName: fileName, // ✅ Now it's guaranteed to have a filename
            filePath: filePath,
          },
        });

        console.log(`📥 PDF saved: ${fileName}`);
      }
    }
  }

  connection.end();
}