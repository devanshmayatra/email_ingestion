import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 
 * ✅ GET: Fetch all email configurations 
 */
export async function GET() {
  try {
    const configs = await prisma.emailIngestionConfig.findMany();
    return NextResponse.json(configs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch configurations" }, { status: 500 });
  }
}

/**
 * ✅ POST: Add a new email configuration
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { emailAddress, connectionType, username, password, host, port, useSSL } = body;

    if (!emailAddress || !connectionType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newConfig = await prisma.emailIngestionConfig.create({
      data: { emailAddress, connectionType, username, password, host, port, useSSL },
    });

    return NextResponse.json(newConfig, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

/**
 * ✅ PUT: Update an existing email configuration
 */
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, emailAddress, connectionType, username, password, host, port, useSSL } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const updatedConfig = await prisma.emailIngestionConfig.update({
      where: { id },
      data: { emailAddress, connectionType, username, password, host, port, useSSL },
    });

    return NextResponse.json(updatedConfig, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update configuration" }, { status: 500 });
  }
}

/**
 * ✅ DELETE: Remove an email configuration by ID
 */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    await prisma.emailIngestionConfig.delete({ where: { id } });
    return NextResponse.json({ message: "Configuration deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete configuration" }, { status: 500 });
  }
}

