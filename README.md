<div align="center">

# 🎮 G2Store - Microservices E-Commerce Platform

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.3-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Microservices](https://img.shields.io/badge/Architecture-Microservices-blueviolet.svg)](https://microservices.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**A modern, scalable e-commerce platform for gaming products built with microservices architecture**

[🎥 Video Demo](#-video-demo) • [✨ Features](#-features) • [🏗️ Architecture](#️-architecture) • [🚀 Getting Started](#-getting-started) • [📚 Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Video Demo](#-video-demo)
- [Features](#-features)
- [Architecture](#️-architecture)
- [Technology Stack](#-technology-stack)
- [Microservices Overview](#-microservices-overview)
- [System Workflow](#-system-workflow)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Configuration](#️-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

**Gaming Zone** is a full-stack, enterprise-grade e-commerce platform specifically designed for gaming products. Built using modern microservices architecture, it provides a scalable, maintainable, and robust solution for online gaming merchandise sales.

The platform enables users to:
- Browse and purchase gaming products
- Manage shopping carts and wishlists
- Track order history
- Write and read product reviews
- Make secure payments via Stripe
- Recover forgotten passwords
- Manage user profiles and accounts

---

## 🎥 Video Demo

> 📹 **[Watch Full Demo Video](YOUR_VIDEO_LINK_HERE)** - See Gaming Zone in action!

<!-- Replace with your actual demo video link -->
<!-- You can use YouTube, Vimeo, or upload to GitHub releases -->

### Quick Preview

```
🔗 Live Demo: [Add your deployed frontend URL]
🖥️ Admin Dashboard: [Add your admin dashboard URL]
📊 Service Monitor: [Add your admin server URL]
```

---

## ✨ Features

### 🛍️ Customer Features
- **User Authentication** - Secure signup, login, and JWT-based authorization
- **Product Catalog** - Browse gaming products with images, descriptions, and pricing
- **Shopping Cart** - Add, remove, and manage cart items
- **Wishlist** - Save favorite products for later
- **Order Management** - View complete purchase history
- **Product Reviews** - Rate and review purchased products
- **Secure Payments** - Stripe integration for safe transactions
- **Password Recovery** - Email-based password reset functionality
- **Account Management** - Update profile, change password, delete account
- **Email Notifications** - Receive order confirmations and updates

### 👨‍💼 Admin Features
- **Product Management** - Create, update, and delete products
- **Inventory Control** - Manage stock levels
- **Order Monitoring** - Track all customer orders
- **Service Health Monitoring** - Real-time microservice status via Admin Server
- **Image Management** - Cloud-based product image storage with Cloudinary

### 🔧 Technical Features
- **Microservices Architecture** - Independently deployable services
- **Service Discovery** - Automatic service registration with Eureka
- **API Gateway** - Centralized request routing and filtering
- **Load Balancing** - Ribbon client-side load balancing
- **Circuit Breaker** - Resilience patterns for fault tolerance
- **Centralized Monitoring** - Spring Boot Admin Server integration
- **Cloud Storage** - Cloudinary for product images
- **Email Service** - Spring Mail for notifications

---

## 🏗️ Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│                  (React Frontend - Port: 5173)                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                           │
│              (Spring Cloud Gateway - Port: 8080)                 │
│  • Routing  • Authentication  • Rate Limiting  • CORS            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Service Registry Layer                        │
│            (Netflix Eureka Server - Port: 8761)                  │
│              • Service Discovery  • Health Checks                │
└────────────────────────────┬────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Auth Service │    │Product Service│    │ Cart Service │
│  Port: 8081  │    │  Port: 8082  │    │  Port: 8086  │
└──────────────┘    └──────────────┘    └──────────────┘
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│Password Reset│    │Review Service│    │Payment Service│
│  Port: 8085  │    │  Port: 8084  │    │  Port: 8083  │
└──────────────┘    └──────────────┘    └──────────────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Infrastructure Layer                          │
├─────────────────────────────────────────────────────────────────┤
│  • MySQL Database                                                │
│  • Cloudinary (Image Storage)                                    │
│  • Stripe Payment Gateway                                        │
│  • Email Service (Spring Mail)                                   │
│  • Admin Server (Port: 8079)                                     │
└─────────────────────────────────────────────────────────────────┘
```

### Microservices Architecture

![Microservices Diagram](https://github.com/user-attachments/assets/3e2d20f8-6adf-4147-9c2c-becb1eaf156f)

---

## 🛠 Technology Stack

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 21 | Programming Language |
| **Spring Boot** | 3.4.3 | Application Framework |
| **Spring Cloud** | 2024.0.0 | Microservices Framework |
| **Spring Data JPA** | - | Data Access Layer |
| **Spring Security** | - | Authentication & Authorization |
| **Spring Cloud Gateway** | - | API Gateway |
| **Netflix Eureka** | - | Service Discovery |
| **OpenFeign** | - | Inter-service Communication |
| **Spring Boot Admin** | 3.4.3 | Monitoring & Management |
| **MySQL** | Latest | Relational Database |
| **Maven** | - | Build Tool |
| **Hibernate** | - | ORM Framework |
| **Stripe API** | - | Payment Processing |
| **Cloudinary** | - | Cloud Image Storage |
| **Spring Mail** | - | Email Service |

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI Framework |
| **Vite** | 6.0.5 | Build Tool |
| **React Router DOM** | 7.1.5 | Routing |
| **Axios** | 1.7.9 | HTTP Client |
| **Flowbite React** | 0.10.2 | UI Components |
| **Tailwind CSS** | 3.4.17 | Styling |
| **FontAwesome** | 6.7.2 | Icons |
| **ESLint** | - | Code Linting |

### DevOps & Tools

- **Docker** - Containerization
- **Render** - Backend Deployment
- **Vercel** - Frontend Deployment
- **Git & GitHub** - Version Control
- **Postman** - API Testing

---

## 🔧 Microservices Overview

### 1. **Service Registry** (Port: 8761)
- **Technology**: Netflix Eureka Server
- **Purpose**: Service discovery and registration
- **Key Features**: 
  - Dynamic service registration
  - Health monitoring
  - Service location resolution

### 2. **API Gateway** (Port: 8080)
- **Technology**: Spring Cloud Gateway
- **Purpose**: Single entry point for all client requests
- **Key Features**:
  - Request routing
  - Load balancing
  - Authentication & authorization
  - CORS configuration
  - Rate limiting

### 3. **Authentication Service** (Port: 8081)
- **Responsibilities**:
  - User registration and login
  - JWT token generation and validation
  - User profile management
  - Account deletion
  - Role-based access control
- **Database**: User credentials, profiles, roles

### 4. **Admin Dashboard Service / Product Service** (Port: 8082)
- **Responsibilities**:
  - CRUD operations for products
  - Image upload to Cloudinary
  - Inventory management
  - Product search and filtering
- **Database**: Products, categories, inventory
- **External Integration**: Cloudinary

### 5. **Payment Service** (Port: 8083)
- **Responsibilities**:
  - Stripe payment integration
  - Payment processing
  - Transaction logging
  - Payment status updates
- **External Integration**: Stripe API

### 6. **Review Service** (Port: 8084)
- **Responsibilities**:
  - Product review submission
  - Rating management
  - Review moderation
  - Review retrieval
- **Database**: Reviews, ratings

### 7. **Forgot Password Service** (Port: 8085)
- **Responsibilities**:
  - Password reset token generation
  - Email verification
  - Password update
  - Token validation
- **External Integration**: Email Service

### 8. **Cart & Order History Service** (Port: 8086)
- **Responsibilities**:
  - Shopping cart management
  - Order placement
  - Order history tracking
  - Wishlist management
- **Database**: Cart items, orders, order details

### 9. **Admin Server** (Port: 8079)
- **Technology**: Spring Boot Admin (Codecentric)
- **Purpose**: Monitoring and management
- **Key Features**:
  - Service health checks
  - Real-time metrics
  - Log viewing
  - JVM statistics

---

## 🔄 System Workflow

### User Registration & Login Flow
```
User → API Gateway → Auth Service → MySQL
                         ↓
                    JWT Token
                         ↓
                      Client
```

### Product Purchase Flow
```
User Browses Products
        ↓
API Gateway → Product Service → Retrieve Products
        ↓
User Adds to Cart
        ↓
API Gateway → Cart Service → Save Cart
        ↓
User Proceeds to Payment
        ↓
API Gateway → Payment Service → Stripe → Process Payment
        ↓
Order Confirmation
        ↓
Email Service → Send Confirmation Email
```

### Service Communication Flow
```
API Gateway ←→ Service Registry (Eureka)
     ↓               ↓
All Microservices ←→ Feign Client
     ↓
MySQL Database
     ↓
Admin Server (Monitoring)
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Java Development Kit (JDK)** 21 or higher
  ```bash
  java -version
  ```
- **Node.js** 18.x or higher & npm
  ```bash
  node --version
  npm --version
  ```
- **MySQL** 8.0 or higher
  ```bash
  mysql --version
  ```
- **Maven** 3.8 or higher
  ```bash
  mvn --version
  ```
- **Git**
  ```bash
  git --version
  ```

### External Services Accounts
- **Stripe Account** - For payment processing
- **Cloudinary Account** - For image storage
- **Email Service** - Gmail or other SMTP server

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
# Clone the main repository
git clone https://github.com/ManishPatidar806/GameingZone_MicroService.git

# Navigate to project directory
cd GameingZone_MicroService
```

### Step 2: Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE gamingzone_db;

# Create databases for each service (optional, or use single DB)
CREATE DATABASE auth_service_db;
CREATE DATABASE product_service_db;
CREATE DATABASE cart_service_db;
CREATE DATABASE payment_service_db;
CREATE DATABASE review_service_db;

# Exit MySQL
exit;
```

### Step 3: Backend Configuration

#### Configure Each Microservice

Navigate to each service and update `application.properties`:

**Example: AuthMicroservice Configuration**

```bash
cd Backend/AuthMicroservice/src/main/resources
nano application.properties
```

Update with your credentials:

```properties
# Application Name
spring.application.name=AUTHENTICATION-SERVICE

# Server Port
server.port=8081

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/auth_service_db
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Eureka Configuration
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/

# Admin Server
spring.boot.admin.client.url=http://localhost:8079

# JWT Configuration
jwt.secret=YOUR_SECRET_KEY_HERE
jwt.expiration=86400000

# Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=YOUR_EMAIL@gmail.com
spring.mail.password=YOUR_APP_PASSWORD
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

**Repeat similar configuration for all services:**
- `AdminDashboardService` (Product Service)
- `CartHistoryService`
- `ForgotPasswordService`
- `Payment`
- `ReviewService`

#### Additional Configurations

**Product Service - Cloudinary Setup:**
```properties
cloudinary.cloud-name=YOUR_CLOUD_NAME
cloudinary.api-key=YOUR_API_KEY
cloudinary.api-secret=YOUR_API_SECRET
```

**Payment Service - Stripe Setup:**
```properties
stripe.api.key=YOUR_STRIPE_SECRET_KEY
stripe.public.key=YOUR_STRIPE_PUBLIC_KEY
```

### Step 4: Build Backend Services

```bash
# Navigate to Backend directory
cd Backend

# Build all services (from Backend root)
# Service Registry
cd ServiceRegistry
./mvnw clean install
cd ..

# Admin Server
cd AdminServer
./mvnw clean install
cd ..

# API Gateway
cd GateWay
./mvnw clean install
cd ..

# Auth Microservice
cd AuthMicroservice
./mvnw clean install
cd ..

# Product Service
cd AdminDashboardService
./mvnw clean install
cd ..

# Cart Service
cd CartHistoryService
./mvnw clean install
cd ..

# Payment Service
cd Payment
./mvnw clean install
cd ..

# Review Service
cd ReviewService
./mvnw clean install
cd ..

# Forgot Password Service
cd ForgotPasswordService
./mvnw clean install
cd ..
```

### Step 5: Frontend Configuration

```bash
# Navigate to Frontend directory
cd ../../Frontend

# Install dependencies
npm install

# Create .env file
nano .env
```

Add environment variables:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_STRIPE_PUBLIC_KEY=YOUR_STRIPE_PUBLIC_KEY
```

---

## ⚙️ Configuration

### Port Configuration Summary

| Service | Port | URL |
|---------|------|-----|
| Service Registry | 8761 | http://localhost:8761 |
| API Gateway | 8080 | http://localhost:8080 |
| Auth Service | 8081 | http://localhost:8081 |
| Product Service | 8082 | http://localhost:8082 |
| Payment Service | 8083 | http://localhost:8083 |
| Review Service | 8084 | http://localhost:8084 |
| Forgot Password Service | 8085 | http://localhost:8085 |
| Cart Service | 8086 | http://localhost:8086 |
| Admin Server | 8079 | http://localhost:8079 |
| Frontend | 5173 | http://localhost:5173 |

### Security Configuration

Update API Gateway CORS settings in `GateWay/src/main/resources/application.properties`:

```properties
# Frontend URL for CORS
frontend.url=http://localhost:5173
```

---

## 🎯 Running the Application

### Start Services in Order

#### 1. Start Service Registry (FIRST)
```bash
cd Backend/ServiceRegistry
./mvnw spring-boot:run
```
Wait for: `Eureka Server started` (30 seconds)

#### 2. Start Admin Server
```bash
cd Backend/AdminServer
./mvnw spring-boot:run
```

#### 3. Start All Microservices (in parallel or separate terminals)

**Terminal 1 - Auth Service:**
```bash
cd Backend/AuthMicroservice
./mvnw spring-boot:run
```

**Terminal 2 - Product Service:**
```bash
cd Backend/AdminDashboardService
./mvnw spring-boot:run
```

**Terminal 3 - Cart Service:**
```bash
cd Backend/CartHistoryService
./mvnw spring-boot:run
```

**Terminal 4 - Payment Service:**
```bash
cd Backend/Payment
./mvnw spring-boot:run
```

**Terminal 5 - Review Service:**
```bash
cd Backend/ReviewService
./mvnw spring-boot:run
```

**Terminal 6 - Forgot Password Service:**
```bash
cd Backend/ForgotPasswordService
./mvnw spring-boot:run
```

#### 4. Start API Gateway (AFTER all services)
```bash
cd Backend/GateWay
./mvnw spring-boot:run
```

#### 5. Start Frontend
```bash
cd Frontend
npm run dev
```

### Verify Services

1. **Eureka Dashboard**: http://localhost:8761
   - Check all services are registered

2. **Admin Server**: http://localhost:8079
   - Monitor service health

3. **Frontend Application**: http://localhost:5173
   - Access the main application

---

## 📖 API Documentation

### Base URL
```
http://localhost:8080
```

### Authentication Endpoints

#### Register User
```http
POST /v1/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {...}
}
```

#### Get Profile
```http
GET /v1/auth/profile
Authorization: Bearer {token}
```

### Product Endpoints

#### Get All Products
```http
GET /v1/product/getAllProducts
```

#### Create Product (Admin)
```http
POST /v1/product/uploadProduct
Authorization: Bearer {admin_token}
Content-Type: multipart/form-data

{
  "name": "Gaming Keyboard",
  "description": "RGB Mechanical Keyboard",
  "price": 99.99,
  "stock": 50,
  "image": [file]
}
```

### Cart Endpoints

#### Add to Cart
```http
POST /v1/cart/addToCart
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": 123,
  "quantity": 2
}
```

### Payment Endpoints

#### Create Payment Intent
```http
POST /v1/payment/create-payment-intent
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 199.98,
  "currency": "usd"
}
```

### Review Endpoints

#### Submit Review
```http
POST /v1/review/submitReview
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": 123,
  "rating": 5,
  "comment": "Excellent product!"
}
```

For complete API documentation, import the [Postman Collection](#) (add link to your collection).

---

## 🚢 Deployment

### Backend Deployment (Render)

1. **Create Render Account**: https://render.com

2. **Deploy Each Service**:
   - Create new Web Service
   - Connect GitHub repository
   - Configure build command: `./mvnw clean package`
   - Configure start command: `java -jar target/*.jar`
   - Set environment variables
   - Deploy

3. **Update Service URLs**:
   - Update `eureka.client.service-url.defaultZone` with deployed Eureka URL
   - Update gateway routes with deployed service URLs

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to Frontend directory
cd Frontend

# Deploy
vercel --prod

# Or push to GitHub and connect to Vercel dashboard
```

Update `vercel.json` (already configured):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Docker Deployment (Optional)

**Example Dockerfile for a service:**

```dockerfile
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Build and run:**
```bash
docker build -t auth-service .
docker run -p 8081:8081 auth-service
```

---

## 📁 Project Structure

```
GameingZone_MicroService/
│
├── Backend/
│   ├── ServiceRegistry/              # Eureka Server
│   │   ├── src/
│   │   └── pom.xml
│   │
│   ├── GateWay/                      # API Gateway
│   │   ├── src/
│   │   └── pom.xml
│   │
│   ├── AdminServer/                  # Admin Monitoring
│   │   ├── src/
│   │   └── pom.xml
│   │
│   ├── AuthMicroservice/             # Authentication Service
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/
│   │   │   │   │   └── com/microservice/authmicroservice/
│   │   │   │   │       ├── controller/
│   │   │   │   │       ├── service/
│   │   │   │   │       ├── repository/
│   │   │   │   │       ├── model/
│   │   │   │   │       ├── config/
│   │   │   │   │       └── AuthMicroserviceApplication.java
│   │   │   │   └── resources/
│   │   │   │       └── application.properties
│   │   └── pom.xml
│   │
│   ├── AdminDashboardService/        # Product Service
│   ├── CartHistoryService/           # Cart & Orders
│   ├── Payment/                      # Payment Processing
│   ├── ReviewService/                # Product Reviews
│   └── ForgotPasswordService/        # Password Reset
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Authentication/       # Login, Signup
│   │   │   ├── Home/                 # Homepage
│   │   │   ├── ProductDetails/       # Product pages
│   │   │   ├── CartItem/             # Cart & Wishlist
│   │   │   ├── Payment/              # Checkout
│   │   │   ├── Profile/              # User profile
│   │   │   ├── AdminDashboard/       # Admin panel
│   │   │   └── HeaderAndFooter/      # Navigation
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json
│
└── README.md
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
   ```bash
   # Click the 'Fork' button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/GameingZone_MicroService.git
   cd GameingZone_MicroService
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes and Commit**
   ```bash
   git add .
   git commit -m "Add: your feature description"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to original repository
   - Click 'New Pull Request'
   - Select your branch
   - Describe your changes

### Coding Standards

- Follow Java naming conventions
- Write unit tests for new features
- Update documentation
- Keep commits atomic and descriptive

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Services not registering with Eureka**
```bash
# Solution: Ensure Service Registry is running first
# Check application.properties for correct Eureka URL
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
```

**Issue: Database connection errors**
```bash
# Solution: Verify MySQL is running and credentials are correct
sudo systemctl status mysql
mysql -u root -p
```

**Issue: Port already in use**
```bash
# Solution: Kill process using the port
sudo lsof -i :8080
sudo kill -9 [PID]
```

**Issue: Frontend can't reach backend**
```bash
# Solution: Check CORS configuration in API Gateway
# Verify frontend.url property matches your frontend URL
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Manish Patidar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👨‍💻 Contact

**Manish Patidar**

- 📧 Email: [your.email@example.com](mailto:your.email@example.com)
- 🐙 GitHub: [@ManishPatidar806](https://github.com/ManishPatidar806)
- 💼 LinkedIn: [Add your LinkedIn profile]
- 🌐 Portfolio: [Add your portfolio website]

---

## 🙏 Acknowledgments

- Spring Framework Team
- Netflix OSS Team
- React Community
- Stripe Team
- Cloudinary Team
- All open-source contributors

---

## 📊 Project Statistics

```
Total Microservices: 9
Lines of Code: ~20,000+
Technologies Used: 15+
Development Time: [Add your timeline]
```

---

## 🗺️ Roadmap

- [ ] Add GraphQL API support
- [ ] Implement Redis caching
- [ ] Add Kafka for event streaming
- [ ] Implement OAuth2 social login
- [ ] Add real-time notifications with WebSocket
- [ ] Implement recommendation engine
- [ ] Add multi-language support
- [ ] Mobile app development (React Native)
- [ ] Enhanced analytics dashboard
- [ ] AI-powered product recommendations

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ by [Manish Patidar](https://github.com/ManishPatidar806)**

</div>
