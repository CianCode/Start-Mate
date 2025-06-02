

<div align="center">
  <img src="./public/Banner.png" alt="StartMate Banner" width="100%" />

# 🚀 StartMate

**A modern, production-ready full-stack web application template**

Built with Next.js 15, TypeScript, Tailwind CSS, Drizzle ORM, PostgreSQL, BetterAuth, and ShadCN UI

</div>

---

## 🧰 Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/UI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![BetterAuth](https://img.shields.io/badge/BetterAuth-7C3AED?style=for-the-badge&logo=auth0&logoColor=white)

</div>

---

## ✨ Features

### 🔐 Authentication & Authorization
- **Secure Login/Registration**: Email and password authentication with proper validation
- **Email Verification**: OTP-based email confirmation system
- **Role-Based Access Control**: Admin, user, and guest role management
- **Password Reset**: Secure password reset flow with email verification
- **Session Management**: Secure JWT-based session handling

### 🎨 User Interface
- **Modern Design System**: Beautiful, accessible components with ShadCN UI
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Theme switching with persistent user preferences
- **Loading States**: Skeleton loaders and progress indicators
- **Form Validation**: Real-time validation with helpful error messages

### 🛠️ Developer Experience
- **Type Safety**: Full TypeScript coverage with strict mode
- **Database Management**: Type-safe database queries with Drizzle ORM
- **Code Quality**: ESLint, Prettier, and pre-commit hooks
- **Hot Reload**: Instant feedback during development
- **API Documentation**: Auto-generated API docs

### 🚀 Performance & Production
- **Optimized Builds**: Next.js optimizations for production
- **Database Pooling**: Connection pooling for better performance
- **Caching Strategy**: Built-in caching for API routes and pages
- **Docker Ready**: Production-ready containerization
- **Health Checks**: Built-in health monitoring endpoints

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (recommended) or npm - [Install pnpm](https://pnpm.io/installation)
- **Docker & Docker Compose** - [Get Docker](https://docs.docker.com/get-docker/)
- **Git** - [Install Git](https://git-scm.com/downloads)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/CianCode/Start-Mate.git
cd StartMate
```

#### 2. Install Dependencies
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

#### 3. Environment Setup
Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database
DATABASE_URL="postgresql://startmate_user:startmate_password@localhost:5432/startmate_db"

# Authentication
BETTER_AUTH_SECRET="your-super-secure-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Email (for verification)
SMTP_HOST="your-smtp-host"
SMTP_PORT=587
SMTP_USER="your-email@domain.com"
SMTP_PASS="your-email-password"
SMTP_FROM="noreply@yourdomain.com"

# Optional: Analytics, monitoring, etc.
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

#### 4. Start the Database
```bash
# Start PostgreSQL with Docker
docker compose up -d

# Wait for the database to be ready (about 10-15 seconds)
```

#### 5. Set Up the Database Schema
```bash
# Push the schema to your database
pnpm drizzle:push

# Or run migrations (if you prefer)
pnpm drizzle:migrate
```

#### 6. Start the Development Server
```bash
pnpm dev
```

🎉 **Success!** Visit [http://localhost:3000](http://localhost:3000) to see your application running.

---

## 📁 Project Structure

```
StartMate/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── verify-email/
│   ├── api/                     # API routes
│   │   ├── auth/
│   │   └── users/
│   ├── dashboard/               # Protected dashboard pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── ui/                      # ShadCN UI components
│   ├── forms/                   # Form components
│   ├── navigation/              # Navigation components
│   └── providers/               # Context providers
├── lib/                         # Utility functions
│   ├── auth.ts                  # Authentication config
│   ├── db.ts                    # Database connection
│   ├── utils.ts                 # Helper functions
│   └── validations/             # Zod schemas
├── db/                          # Database related files
│   ├── schema.ts                # Drizzle schema definitions
│   ├── migrations/              # Database migrations
│   └── seed.ts                  # Database seeding
├── hooks/                       # Custom React hooks
├── types/                       # TypeScript type definitions
├── public/                      # Static assets
├── docker-compose.yml           # Docker configuration
├── drizzle.config.ts           # Drizzle ORM configuration
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 📚 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm type-check       # Run TypeScript compiler check

# Database
pnpm drizzle:generate # Generate database migrations
pnpm drizzle:push     # Push schema to database
pnpm drizzle:migrate  # Run database migrations
pnpm drizzle:studio   # Open Drizzle Studio (database GUI)
pnpm db:seed          # Seed database with sample data

# Docker
pnpm docker:up        # Start all services with Docker
pnpm docker:down      # Stop all Docker services
pnpm docker:build     # Build Docker images
pnpm docker:logs      # View Docker logs

# Testing (when implemented)
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Start for Contributors

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [ShadCN UI](https://ui.shadcn.com/) - Beautiful and accessible component library
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM for SQL databases
- [BetterAuth](https://www.better-auth.com/) - Authentication library for modern web apps
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

## 🌟 Show Your Support

If this project helped you, please consider:
- ⭐ Starring the repository
- 🍴 Forking for your own projects
- 📢 Sharing with others
- 🐛 Reporting bugs or suggesting improvements

---

<div align="center">
  <strong>Built with ❤️ by <a href="https://github.com/CianCode">CianCode</a></strong>

  <p>Happy coding! 🚀</p>
</div>