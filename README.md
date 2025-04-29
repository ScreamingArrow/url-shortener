# 📦 NestJS URL Shortener

A URL Shortener built with **NestJS**, **PostgreSQL**, and **Docker Compose**.

## 🚀 Getting Started

These instructions will get the project up and running on your local machine using Docker.

---

## 🛠 Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- (Optional) [Node.js](https://nodejs.org/) installed if you want to run locally without Docker

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
# app-related environment variables
PORT=3000
STAGE=development
RANDOM_BYTES_SIZE=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
JWT_SECRET=
JWT_EXPIRES_IN=1h

# database credentials
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

You can check `.env.example`.

---

## 🐳 Running with Docker Compose

1. **Build and start the containers:**

```bash
docker-compose up --build
```

2. **The API will be available at:**

```
http://localhost:3000
```

3. **Swagger API docs will be available at:**

```
http://localhost:3000/docs
```

---

## 🖐 Useful Commands

- **Stop Docker Compose**:

```bash
docker-compose down
```

- **View running containers**:

```bash
docker ps
```

- **Rebuild the app**:

```bash
docker-compose up --build
```

## 🛠 Migrations

If you are using TypeORM migrations, you may want to run:

```bash
npm run migration:run
```

Or if using Docker:

```bash
docker-compose exec app npm run migration:run
```

---

## 🧪 Testing

```bash
npm run test
```

---

## ✨ Acknowledgments

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

---
