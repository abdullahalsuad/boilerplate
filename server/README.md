# MyRizq Server

A modern, scalable backend API built with NestJS, GraphQL, and PostgreSQL. This server provides a robust foundation for the MyRizq application with type-safe database operations using Prisma ORM.

## 🚀 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) - A progressive Node.js framework
- **API**: [GraphQL](https://graphql.org/) with Apollo Server
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/) - Next-generation TypeScript ORM
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8.x or higher) - Install via: `npm install -g pnpm`
- **PostgreSQL** (v14.x or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

### Verify Installation

```bash
node --version    # Should be v18.x or higher
pnpm --version    # Should be v8.x or higher
psql --version    # Should be v14.x or higher
```

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd my-rizq-server
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Database Setup

#### Option A: Using Local PostgreSQL

1. **Start PostgreSQL Service**
   - **Windows**: PostgreSQL should start automatically, or use Services app
   - **macOS**: `brew services start postgresql`
   - **Linux**: `sudo systemctl start postgresql`

2. **Create Database**

```bash
# Access PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE myrizq_db;

# Create user (optional)
CREATE USER myrizq_user WITH PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE myrizq_db TO myrizq_user;

# Exit
\q
```

#### Option B: Using Docker (Recommended)

```bash
# Run PostgreSQL in Docker
docker run --name myrizq-postgres \
  -e POSTGRES_DB=myrizq_db \
  -e POSTGRES_USER=myrizq_user \
  -e POSTGRES_PASSWORD=your_secure_password \
  -p 5432:5432 \
  -d postgres:16-alpine
```

### 4. Environment Configuration

Create a `.env` file in the root directory:

```bash
# Copy from example (if exists) or create new
touch .env
```

Add the following environment variables to `.env`:

```env
# Database Configuration
DATABASE_URL="postgresql://myrizq_user:your_secure_password@localhost:5432/myrizq_db?schema=public"

# Server Configuration
PORT=3000
NODE_ENV=development

# API Configuration
GRAPHQL_PLAYGROUND=true
GRAPHQL_DEBUG=true

# Add other environment variables as needed
# JWT_SECRET=your_jwt_secret_here
# JWT_EXPIRES_IN=7d
```

**Important**: Never commit `.env` file to version control!

### 5. Prisma Setup

```bash
# Generate Prisma Client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev --name init

# (Optional) Seed the database
pnpm prisma db seed
```

### 6. Verify Setup

```bash
# Check database connection
pnpm prisma studio
```

This will open Prisma Studio at `http://localhost:5555` where you can view and manage your database.

## 🏃 Running the Application

### Development Mode

```bash
# Start with hot-reload
pnpm start:dev
```

The server will start at `http://localhost:3000`

- **GraphQL Playground**: `http://localhost:3000/graphql`
- **API Documentation**: `http://localhost:3000/api` (if Swagger is configured)

### Production Mode

```bash
# Build the application
pnpm build

# Start production server
pnpm start:prod
```

### Debug Mode

```bash
pnpm start:debug
```

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov

# Run e2e tests
pnpm test:e2e
```

## 📦 Available Scripts

| Command            | Description                               |
| ------------------ | ----------------------------------------- |
| `pnpm start`       | Start the application                     |
| `pnpm start:dev`   | Start in development mode with hot-reload |
| `pnpm start:debug` | Start in debug mode                       |
| `pnpm start:prod`  | Start in production mode                  |
| `pnpm build`       | Build the application                     |
| `pnpm format`      | Format code with Prettier                 |
| `pnpm lint`        | Lint and fix code with ESLint             |
| `pnpm test`        | Run unit tests                            |
| `pnpm test:watch`  | Run tests in watch mode                   |
| `pnpm test:cov`    | Run tests with coverage                   |
| `pnpm test:e2e`    | Run end-to-end tests                      |

## 🗄️ Database Management

### Prisma Commands

```bash
# Generate Prisma Client (run after schema changes)
pnpm prisma generate

# Create a new migration
pnpm prisma migrate dev --name <migration_name>

# Apply migrations in production
pnpm prisma migrate deploy

# Reset database (WARNING: deletes all data)
pnpm prisma migrate reset

# Open Prisma Studio (GUI for database)
pnpm prisma studio

# Format schema file
pnpm prisma format

# Validate schema
pnpm prisma validate
```

### Creating Migrations

When you modify `prisma/schema.prisma`:

```bash
# Create and apply migration
pnpm prisma migrate dev --name add_user_role

# This will:
# 1. Create a new migration file
# 2. Apply it to your database
# 3. Regenerate Prisma Client
```

## 🏗️ Project Structure

```
my-rizq-server/
├── prisma/
│   ├── migrations/         # Database migrations
│   ├── schema.prisma       # Database schema
│   └── seed.ts            # Database seeding script
├── src/
│   ├── common/            # Shared utilities and decorators
│   ├── prisma/            # Prisma service and module
│   ├── user/              # User module (example)
│   ├── app.module.ts      # Root application module
│   ├── app.controller.ts  # Root controller
│   ├── app.service.ts     # Root service
│   └── main.ts            # Application entry point
├── test/                  # E2E tests
├── .env                   # Environment variables (not in git)
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
├── nest-cli.json         # NestJS CLI configuration
├── package.json          # Dependencies and scripts
├── pnpm-lock.yaml        # Lock file for pnpm
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## 🔧 Configuration

### TypeScript Configuration

The project uses strict TypeScript settings. Configuration is in `tsconfig.json`.

### ESLint & Prettier

Code quality is maintained using:

- **ESLint**: Linting and code quality rules
- **Prettier**: Code formatting

```bash
# Format code
pnpm format

# Lint code
pnpm lint
```

## 🌐 GraphQL API

### Accessing GraphQL Playground

When running in development mode, access the GraphQL Playground at:

```
http://localhost:3000/graphql
```

### Example Query

```graphql
query {
  users {
    id
    email
    name
    posts {
      id
      title
      content
    }
  }
}
```

### Example Mutation

```graphql
mutation {
  createUser(createUserInput: { email: "user@example.com", name: "John Doe" }) {
    id
    email
    name
  }
}
```

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **Secrets**: Use strong, unique secrets for JWT and other sensitive data
3. **Database**: Use strong passwords and restrict access
4. **Dependencies**: Regularly update dependencies for security patches
5. **CORS**: Configure CORS properly for production
6. **Rate Limiting**: Implement rate limiting for API endpoints

## 🚀 Deployment

### Build for Production

```bash
# Install dependencies
pnpm install --prod

# Generate Prisma Client
pnpm prisma generate

# Run migrations
pnpm prisma migrate deploy

# Build application
pnpm build

# Start production server
pnpm start:prod
```

### Environment Variables for Production

Ensure these are set in your production environment:

```env
NODE_ENV=production
DATABASE_URL=<production_database_url>
PORT=3000
GRAPHQL_PLAYGROUND=false
GRAPHQL_DEBUG=false
```

### Deployment Platforms

This application can be deployed to:

- **Vercel** (with PostgreSQL from Vercel Postgres or external)
- **Railway** (includes PostgreSQL)
- **Render** (includes PostgreSQL)
- **AWS** (EC2 + RDS)
- **DigitalOcean** (App Platform + Managed Database)
- **Heroku** (with Heroku Postgres)

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Error

```
Error: Can't reach database server at `localhost:5432`
```

**Solution**:

- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env`
- Verify database credentials

#### 2. Prisma Client Not Generated

```
Error: @prisma/client did not initialize yet
```

**Solution**:

```bash
pnpm prisma generate
```

#### 3. Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**:

- Change PORT in `.env`
- Or kill the process using port 3000

#### 4. Migration Errors

```
Error: Migration failed
```

**Solution**:

```bash
# Reset database (WARNING: deletes data)
pnpm prisma migrate reset

# Or fix migration manually
pnpm prisma migrate resolve --rolled-back <migration_name>
```

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [GraphQL Documentation](https://graphql.org/learn/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is [UNLICENSED](LICENSE).

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- Prisma team for the excellent ORM
- The open-source community

---

**Need Help?** Open an issue or contact the development team.
