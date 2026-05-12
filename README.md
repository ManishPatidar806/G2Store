# G2Store

## Overview

G2Store is a full-stack gaming e-commerce application built as a modern storefront for gaming products. It combines a React + Vite frontend with a Spring Boot backend to deliver product browsing, cart management, secure checkout, reviews, admin management, and user authentication.

## Architecture

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router
- **Backend:** Spring Boot, Spring Security, Spring Data JPA, MySQL
- **Payments:** Stripe
- **Image storage:** Cloudinary
- **Authentication:** JWT and Google OAuth support
- **Caching:** Caffeine
- **Rate limiting:** Bucket4j

## Key Features

- User registration and login
- Google OAuth sign-in support
- Product listing, filtering, and detail views
- Shopping cart and wishlist management
- Stripe checkout and payment confirmation
- Product reviews and ratings
- Admin dashboard for product and order management
- User profile and account deletion
- Email support and application health monitoring

## Repository Structure

- `Backend/` — Spring Boot API and service layer
- `Frontend/` — React application and UI components

## Prerequisites

- Java 21
- Maven 3.8+ (or use the included Maven wrapper `./mvnw`)
- Node.js 18+ and npm
- MySQL database
- Cloudinary account for image uploads
- Stripe account for payments
- Gmail account for Spring Mail (optional for email features)

## Backend Setup

1. Open a terminal in `Backend/`
2. Configure environment variables for your development environment.

Required backend environment variables:

- `DATABASE_URL`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`
- `CLOUDINARY_NAME`
- `CLOUDINARY_KEY`
- `CLOUDINARY_SECRET`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `PAYMENT_SECRET_KEY`
- `GOOGLE_CLIENT_ID`
- `FRONTEND_URL`

Example `application.properties` values are already configured to use these variables.

### Run backend locally

```bash
cd Backend
./mvnw spring-boot:run
```

Alternatively:

```bash
cd Backend
mvn spring-boot:run
```

### Build backend jar

```bash
cd Backend
./mvnw clean package
```

## Frontend Setup

1. Open a terminal in `Frontend/`
2. Create a `.env` file or set the variables in your shell.

Required frontend environment variables:

- `VITE_APP_API_URL` — backend API base URL, e.g. `http://localhost:8080`
- `VITE_GOOGLE_CLIENT_ID` — Google OAuth client ID

### Install dependencies

```bash
cd Frontend
npm install
```

### Run frontend locally

```bash
npm run dev
```

### Build frontend for production

```bash
npm run build
```

## Recommended Startup Order

1. Start the backend API:
   - `cd Backend && ./mvnw spring-boot:run`
2. Start the frontend app:
   - `cd Frontend && npm install && npm run dev`

## Useful Endpoints

The frontend communicates with the backend API using routes such as:

- `/v1/auth/*` — authentication, profile, account actions
- `/v1/product/*` — product listing, upload, update, delete
- `/v1/cartItem/*` — cart and wishlist operations
- `/v1/order/*` — order creation and order history
- `/v1/payment/*` — Stripe checkout and session details
- `/v1/review/*` — add, delete, and fetch product reviews
- `/v1/order/admin/*` — admin order management

## Notes

- The backend is configured with Spring Security and JWT for protected routes.
- Caching is enabled with Caffeine for frequently accessed resources.
- The application uses Cloudinary for product image management and Stripe for payments.

## License

This repository does not include a license file. Add a license if you want to open source the project.
