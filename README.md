Email & PDF Ingestion App

📌 Project Overview
This application allows users to configure email accounts (IMAP) and automatically retrieve emails with PDF attachments. It stores email metadata in a PostgreSQL database using Prisma and downloads PDFs to a local folder.

---

🚀 Features
- Configure multiple email accounts
- Supports IMAP
- Automatically fetches emails with PDF attachments
- Stores email metadata (sender, subject, date, etc.) in PostgreSQL
- Saves PDFs to a local folder (`./pdfs/`)
- Simple Next.js frontend for managing email configurations

---

🏗️ Tech Stack
- **Frontend**: Next.js (React + TypeScript)
- **Backend**: Node.js (Express API Routes in Next.js)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Basic Auth (IMAP)

---

📂 Project Structure
```sh
email-pdf-reader-app/
│-- prisma/                  # Prisma schema & migrations
│-- public/                  # Static assets
│-- src/
│   ├── app/
│   │   ├── api/email-ingestion/ # API Routes for email config
│   │   ├── api/email-retrieval/ # API Routes for fetching emails
│   │   ├── components/         # Reusable UI components
│   │   ├── lib/                # Utility functions (Gmail API, IMAP, etc.)
│   │   ├── styles/             # Global styles
│   ├── pages/
│   │   ├── index.tsx           # Main UI for configuring emails
│-- .env                        # Environment variables
│-- README.md                   # Documentation
│-- package.json                # Project dependencies
│-- tsconfig.json                # TypeScript configuration
```

---

## 🔧 Setup Instructions

### 1️⃣ Install Dependencies
```sh
git clone https://github.com/your-repo/email-pdf-reader-app.git
cd email-pdf-reader-app
npm install
```

### 2️⃣ Set Up PostgreSQL (Database)
You can use **Neon, Railway, Supabase**, or a local PostgreSQL instance.
```sh
npx prisma migrate dev --name init
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file and configure the following:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/email_db"
GMAIL_CLIENT_ID="your-google-client-id"
GMAIL_CLIENT_SECRET="your-google-client-secret"
GMAIL_REDIRECT_URI="http://localhost:3000/api/auth/callback/google"
GMAIL_REFRESH_TOKEN="your-refresh-token"
```

### 4️⃣ Start the Server
```sh
npm run dev
```

The app will be available at `http://localhost:3000`

---

📩 Using the App
1. **Add an Email Configuration** via the UI (`email, IMAP/Gmail API settings`).
2. Click **“Save”** and start the email retrieval process.
3. The system will fetch new emails with PDF attachments and store them in `./pdfs/`.
4. Email metadata will be stored in PostgreSQL.

---

🧪 Testing
- **Postman**: Test the API endpoints (`/api/email-ingestion`, `/api/email-retrieval`).
- **Manual**: Send an email with a PDF attachment and check if it's saved in `./pdfs/`.

---
IMAP Connection Issues
- Ensure IMAP is enabled in Gmail settings.
- Try adding `tlsOptions: { rejectUnauthorized: false }`.

Database Not Connecting
- Check `DATABASE_URL` in `.env`.
- Ensure PostgreSQL is running.

---

📜 License
This project is open-source under the MIT License.

---

💡 Future Improvements
- Implement file encryption for PDFs.
- Add email filtering based on subject or sender.
- Deploy on Vercel or Railway for cloud hosting.

---

🙌 Contributing
Feel free to open issues and submit PRs!

---

Made By Devansh Mayatra

