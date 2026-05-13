# G2Store

A full-stack gaming e-commerce platform with a React frontend and a Spring Boot backend.

## Table of Contents

1. [Project Highlights](#project-highlights)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Monorepo Structure](#monorepo-structure)
5. [Prerequisites](#prerequisites)
6. [Quick Start](#quick-start)
7. [Environment Variables](#environment-variables)
8. [Run Locally (Without Docker)](#run-locally-without-docker)
9. [API Overview](#api-overview)
10. [Security, Performance, and Operations](#security-performance-and-operations)
11. [Build and Deploy](#build-and-deploy)
12. [Troubleshooting](#troubleshooting)
13. [Known Notes](#known-notes)
14. [License](#license)

## Project Highlights

- Google OAuth-based authentication with JWT issuance.
- Product catalog management with admin-protected actions.
- Cart, order placement, and order status workflows.
- Stripe checkout session creation and payment session retrieval.
- Product review system with role-aware deletion rules.
- Cloudinary integration for media handling.
- Caffeine caching, Bucket4j rate limiting, and secure HTTP headers.
- Dockerized backend, frontend, and MySQL services.

## Architecture

```text
Frontend (React + Vite)  --->  Backend API (Spring Boot)  --->  MySQL
             |                           |                            |
             |                           |                            |
             |                           +--> Stripe (payments)       |
             |                           +--> Cloudinary (media)      |
             |                           +--> Google OAuth verify     |
```

## Tech Stack

### Frontend

- React 18
- Vite 6
- React Router
- Axios
- Tailwind CSS
- ESLint

### Backend

- Java 21
- Spring Boot 3.5
- Spring Web, Security, Validation
- Spring Data JPA + MySQL
- JWT (jjwt)
- Google ID Token verification
- Stripe SDK
- Cloudinary SDK
- Caffeine cache
- Bucket4j rate limiting
- Spring Actuator

### Infrastructure

- Docker and Docker Compose
- Nginx (frontend static serving + SPA fallback)

## Monorepo Structure

```text
G2Store/
   Backend/    # Spring Boot API
   Frontend/   # React application
   docker-compose.yml
```

## Prerequisites

- Docker + Docker Compose (recommended path), or:
- Java 21
- Maven 3.9+ (or use Maven Wrapper in Backend)
- Node.js 20+ and npm
- MySQL 8+
- Cloudinary account
- Stripe account
- Google OAuth client

## Quick Start

### Option A: Docker Compose (recommended)

1. Create a root `.env` file beside `docker-compose.yml`.
2. Add the required variables from the [Environment Variables](#environment-variables) section.
3. Run:

```bash
docker compose up --build
```

4. Access services:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`
- MySQL: `localhost:3306`

### Option B: Local Development

Run MySQL first, then backend, then frontend. Detailed commands are in [Run Locally (Without Docker)](#run-locally-without-docker).

## Environment Variables

Set these variables either in shell, in a `.env` file used by Docker Compose, or in platform-specific secret management.

### Backend Required

- `DATABASE_URL` (example: `jdbc:mysql://localhost:3306/g2store?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC`)
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`
- `CLOUDINARY_NAME`
- `CLOUDINARY_KEY`
- `CLOUDINARY_SECRET`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `PAYMENT_SECRET_KEY`
- `GOOGLE_CLIENT_ID`
- `FRONTEND_URL` (example: `http://localhost:3000`)
- `JWT_SECRET` (must be at least 64 chars for HS512)

### Backend Optional

- `JWT_EXPIRATION_MS` (default: `86400000`)
- `security.public-urls` (default: `/v1/auth/google`)

### Frontend Required

- `VITE_APP_API_URL` (example: `http://localhost:8080`)
- `VITE_GOOGLE_CLIENT_ID`

### Docker Compose MySQL Defaults

- `MYSQL_ROOT_PASSWORD` (default: `root`)
- `MYSQL_DATABASE` (default: `g2store`)
- `MYSQL_USER` (default: `g2store`)
- `MYSQL_PASSWORD` (default: `g2store`)

## Run Locally (Without Docker)

### 1) Start MySQL

Ensure the database exists and credentials match your backend environment.

### 2) Start Backend

```bash
cd Backend
chmod +x mvnw
./mvnw spring-boot:run
```

Backend default URL: `http://localhost:8080`

### 3) Start Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend dev URL: `http://localhost:5173`

## API Overview

Base URL: `http://localhost:8080`

All routes are protected by JWT unless explicitly public.
Current default public URL is only `POST /v1/auth/google`.

### Auth and User

- `POST /v1/auth/google` - Authenticate via Google ID token.
- `PATCH /v1/auth/role` - Update role (admin only).
- `GET /v1/auth/profile` - Get current profile.
- `DELETE /v1/auth/deleteAccount` - Delete current account.

### Products

- `POST /v1/product/createproduct` - Create product with multipart payload (admin only).
- `PATCH /v1/product/updateProduct` - Update product (admin only).
- `DELETE /v1/product/removeProduct?name=...` - Remove product (admin only).
- `GET /v1/product/getAllProducts` - Admin product listing.
- `GET /v1/product/allProducts` - Public product listing.

### Cart

- `POST /v1/cartItem/addToCart`
- `DELETE /v1/cartItem/removeFromCart?productName=...`
- `GET /v1/cartItem/allCartItem`
- `DELETE /v1/cartItem/removeAllCart`

### Orders

- `GET /v1/order/getOrderList`
- `POST /v1/order/addOrderList`
- `GET /v1/order/admin/list` (admin)
- `PATCH /v1/order/admin/status?orderId=...&status=...` (admin)

### Payments

- `POST /v1/payment/v2/stripe`
- `GET /v1/payment/detail/session?sessionId=...`

### Reviews

- `POST /v1/review/addReview?productId=...`
- `PUT /v1/review/updateReview?productId=...`
- `DELETE /v1/review/deleteReview?reviewId=...`
- `GET /v1/review/findReview?productId=...`

## Security, Performance, and Operations

- Stateless JWT security filter chain.
- Role-based authorization with `@PreAuthorize`.
- CORS configured from `app.cors.allowed-origins`.
- Rate limiting: 100 requests/minute per client (except selected public paths).
- Security headers enabled via custom filter.
- Caffeine caches for product, user, review, order, and related reads.
- Async task executor configured for background operations.
- Backend graceful shutdown enabled.

## Build and Deploy

### Backend Build

```bash
cd Backend
./mvnw clean package -DskipTests
```

Output jar: `Backend/target/*.jar`

### Frontend Build

```bash
cd Frontend
npm run build
```

Output folder: `Frontend/dist`

### Production Docker Deploy

```bash
docker compose up -d --build
```

## Troubleshooting

- `JWT secret must be at least 64 characters`:
   Set a longer `JWT_SECRET`.
- CORS errors in browser:
   Ensure `FRONTEND_URL` matches the actual frontend origin.
- Stripe session creation fails:
   Verify `PAYMENT_SECRET_KEY` and request payload format.
- Google auth fails:
   Confirm `GOOGLE_CLIENT_ID` in both frontend and backend match the same OAuth app.
- Backend fails on startup with schema validation errors:
   `spring.jpa.hibernate.ddl-auto=validate` requires an existing schema. Create/import DB schema before running.

## Known Notes

- Route naming is case- and spelling-sensitive; keep frontend and backend endpoint names aligned.
- Some frontend calls may still reference legacy route names (for example `uploadProduct` or `removeToCart`). Backend currently exposes `createproduct` and `removeFromCart`.
- There is no license file in this repository yet.

## License

No license is currently declared.
