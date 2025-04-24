<!-- Start Mate README -->

<h1 align="center">🚀 Start Mate</h1>
<p align="center">
  <strong>The Ultimate Fullstack Starter Template</strong><br />
  Build secure, scalable, and modern web applications — fast.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-Production Ready-blue"  alt=""/>
  <img src="https://img.shields.io/badge/TailwindCSS-Modern UI-teal" alt=""/>
  <img src="https://img.shields.io/badge/PostgreSQL-Dockerized-316192" alt=""/>
  <img src="https://img.shields.io/badge/Auth-BetterAuth-green" alt=""/>
</p>

---

## ✨ Overview

**Start Mate** is a fullstack boilerplate designed for developers who want a seamless starting point for their web applications. It combines modern tools with best practices to provide a beautiful, scalable, and secure base that’s production-ready out-of-the-box.

---

## 🔧 Tech Stack

<table>
  <tr>
    <td align="center"><img alt="" src="https://raw.githubusercontent.com/LelouchFR/skill-icons/c41333390eae96ba0d261d1792207b4d6a9d4d1c/assets/nextjs-auto.svg" width="40"/><br /><strong>Next.js</strong><br /><sub>SSR / App Router</sub></td>
    <td align="center"><img alt="" src="https://raw.githubusercontent.com/LelouchFR/skill-icons/c41333390eae96ba0d261d1792207b4d6a9d4d1c/assets/tailwindcss-auto.svg" width="40"/><br /><strong>TailwindCSS</strong><br /><sub>Utility-first CSS</sub></td>
    <td align="center"><img alt="" src="https://raw.githubusercontent.com/LelouchFR/skill-icons/c41333390eae96ba0d261d1792207b4d6a9d4d1c/assets/shadcn-auto.svg" width="40"/><br /><strong>ShadCN</strong><br /><sub>Accessible UI</sub></td>
    </tr>
  <tr>
    <td align="center"><img alt="" src="https://raw.githubusercontent.com/LelouchFR/skill-icons/c41333390eae96ba0d261d1792207b4d6a9d4d1c/assets/betterauth-auto.svg" width="40"/><br /><strong>BetterAuth</strong><br /><sub>Authentication</sub></td> 
    <td align="center"><img alt="" src="https://raw.githubusercontent.com/LelouchFR/skill-icons/c41333390eae96ba0d261d1792207b4d6a9d4d1c/assets/drizzle-auto.svg" width="40"/><br /><strong>Drizzle ORM</strong><br /><sub>Typed SQL</sub></td>
    <td align="center"><img alt="" src="https://raw.githubusercontent.com/LelouchFR/skill-icons/c41333390eae96ba0d261d1792207b4d6a9d4d1c/assets/postgresql-auto.svg" width="40"/><br /><strong>PostgreSQL</strong><br /><sub>Dockerized DB</sub></td>
    </tr>
</table>
---

## 🎯 Key Features

- 📦 **Out-of-the-box configuration** – Just clone, install, and run
- 🔐 **Credential, OAuth, and email-based OTP authentication**
- 🔄 **Built-in flows for verification and password reset**
- 🧱 **Drizzle-powered schema & migrations**
- 🧪 **Middleware-based route protection**
- ✨ **Pixel-perfect components using ShadCN + Tailwind**
- 🔍 **Fully typed with TypeScript**
- 🐳 **Dockerized PostgreSQL support**
- 🛠️ **Production-grade DX from the start**

---

## 📁 Folder Structure

```
.
├── src/
│   ├── app/              # Routes and layouts (Next.js App Router)
│   ├── components/       # UI components (ShadCN)
│   ├── db/               # Drizzle config and schema
│   ├── emails/           # React Email templates
│   ├── lib/              # Utility functions
│   ├── types/            # Shared TypeScript types
│   └── middleware.ts     # Route protection middleware
├── .env.example          # Example environment variables
├── docker-compose.yml
└── README.md

```

---

## ⚙️ Getting Started

```bash
git clone https://github.com/your-username/start-mate.git
cd start-mate
pnpm install
cp .env.example .env    # Add your secrets and credentials
docker-compose up -d    # Start the PostgreSQL container
pnpm dev                # Launch the development server
```

---

## 🤝 Contribution

We welcome contributions! If you have ideas for improvements, feel free to open issues or submit PRs. This project aims to evolve with the needs of modern developers.

---

## 📜 License

**MIT License** — Free to use, modify, and distribute. Attribution appreciated.

---

<p align="center">
  Made with ❤️ for CianCode who value simplicity and power.<br/>
</p>
