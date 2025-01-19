# NestJS Authentication API

A robust authentication API built with NestJS, implementing Clean Architecture and Domain-Driven Design principles.

## 🚀 Technologies

- [NestJS](https://nestjs.com/) - A progressive Node.js framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [JWT](https://jwt.io/) (RS256) - Secure authentication with public/private key pairs
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) - Password hashing
- [Biome](https://biomejs.dev/) - Fast and reliable linter/formatter
- [Vitest](https://vitest.dev/) - Next-generation testing framework
- [PostgreSQL](https://www.postgresql.org/) - Advanced open-source database
- [Docker](https://www.docker.com/) - Container platform
- [Swagger](https://swagger.io/) - API documentation

## 🏗️ Architecture

This project follows Clean Architecture principles and Domain-Driven Design (DDD), organized around use-cases for better maintainability and scalability.

## 🛠️ Prerequisites

- Node.js
- Docker and Docker Compose
- OpenSSL (for generating RS256 keys)

## ⚙️ Configuration

1. Clone the repository

```bash
git clone [your-repository-url]
cd [your-project-name]
```

2. Install dependencies

```bash
npm install
```

3. Generate RS256 key pair

```bash
# Generate private key
openssl genrsa -out private.pem 2048
# Generate public key
openssl rsa -in private.pem -pubout -out public.pem
```

4. Create `.env` file

```env
DATABASE_URL="postgresql://postgres:docker@localhost:5432/your-database-name?schema=public"
JWT_PRIVATE_KEY="<your-base64-encoded-private-key>"
JWT_PUBLIC_KEY="<your-base64-encoded-public-key>"
```

Note: To convert your keys to base64:

```bash
# For private key
base64 -i private.pem
# For public key
base64 -i public.pem
```

## 🚀 Running the Project

1. Start the database

```bash
npm run docker:up
```

2. Run migrations

```bash
npm run prisma:migrate
```

3. Start the application

```bash
npm run start:dev
```

## 🧪 Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

## 📚 API Documentation

After starting the application, visit:

```
http://localhost:3333/api
```

This will open the Swagger documentation where you can explore and test all available endpoints.

## 📝 Available Endpoints

- `POST /accounts` - Create new account
- `POST /sessions` - Authenticate user
- `GET /users` - List of users
- Additional endpoints can be found in the Swagger documentation

## ⚡ Prisma Studio

To view and edit the database through Prisma Studio:

```bash
npm run prisma:studio
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎯 Project Status

This project is actively maintained and accepting contributions.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details

## 🙏 Credits

This project was inspired by and developed during [Rocketseat](https://rocketseat.com.br/)'s educational program.

---

Made with ♥ by [Diogo Soares]
