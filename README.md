# ResolvX 🚀 — AI-Powered Incident Management Platform

**ResolvX** is a production-grade incident management system designed for modern engineering teams. It leverages **Google Gemini AI** to detect severity, identify root causes, and suggest resolution steps in real-time.

![ResolvX Dashboard Preview](https://github.com/NitinSingh07/Edtech/raw/main/public/preview.png)

## ✨ Features

- 🛠 **Full Incident Lifecycle:** Create, track, assign, and resolve incidents with a robust audit trail.
- 🤖 **AI-Driven Insights:** Automatic severity detection and resolution suggestions powered by Gemini 2.0.
- 📊 **Real-time Analytics:** Interactive dashboards for system health, MTTR, and workload distribution.
- 👥 **Team Collaboration:** Shared activity streams, internal notes, and role-based access control.
- 📱 **Fully Responsive:** Optimized for desktop and mobile with a premium dark-themed UI.
- 🔒 **Secure Auth:** Powered by NextAuth.js v5 (Auth.js) with JWT-based sessions.

## 🛠 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database:** [Prisma](https://www.prisma.io/) (SQLite for local, PostgreSQL ready)
- **AI:** [Vercel AI SDK](https://sdk.vercel.ai/) & [Google Gemini](https://aistudio.google.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Charts:** [Recharts](https://recharts.org/)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/NitinSingh07/Edtech.git
cd Edtech/resolvx
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_GENERATIVE_AI_API_KEY="your-gemini-key"
```

### 4. Setup Database
```bash
npx prisma db push
npx prisma db seed
```

### 5. Run the project
```bash
npm run dev
```

## 👤 Seed Accounts (Default password: `password123`)
- **Admin:** `admin@resolvx.com`
- **Manager:** `sarah@resolvx.com`
- **Engineer:** `alex@resolvx.com`

---

Built with ❤️ by **Antigravity AI** for **House of Edtech**.
