# Ease Courier Gateway

A scalable courier aggregation service built with NestJS.

The application provides a unified API for integrating multiple courier partners while keeping business logic independent from courier-specific implementations.

Currently, Urbanebolt is implemented as the first courier provider using the Factory and Adapter design patterns.

---

# Features

- Unified Order Creation API
- Courier Factory Pattern
- Urbanebolt Adapter
- PostgreSQL with TypeORM
- Redis Token Caching
- Swagger API Documentation
- Docker Support
- Database Migrations
- Request Validation
- Modular Architecture
- Ready for Multiple Courier Integrations

---

# Tech Stack

| Technology | Purpose |
|------------|----------|
| NestJS | Backend Framework |
| TypeScript | Programming Language |
| PostgreSQL | Database |
| TypeORM | ORM |
| Redis | Token Cache |
| Axios | HTTP Client |
| Swagger | API Documentation |
| Docker | Local Infrastructure |

---

# Project Structure

```
src
├── common
├── config
├── couriers
│   ├── adapters
│   ├── factory
│   ├── interfaces
│   ├── shared
│   └── urbanebolt
├── database
├── modules
│   ├── orders
│   ├── tracking
│   ├── batch
│   └── audit
├── queue
└── shared
```

---

# Getting Started

## Clone Repository

```bash
git clone <repository-url>

cd ease-courier-gateway
```

---

## Install Dependencies

```bash
npm install
```

---

## Start PostgreSQL and Redis

```bash
docker compose up -d
```

---

## Configure Environment

Create a `.env` file from `.env.example`.

---

## Run Database Migration

```bash
npm run db:migrate
```

---

## Start Application

```bash
npm run start:dev
```

---

# API Documentation

Swagger UI

```
http://localhost:3000/docs
```

---

# Available APIs

## Health

```
GET /health
```

Returns application health.

---

## Orders

```
POST /orders
```

Creates a shipment using the configured courier partner.

---

# Sample Request

```json
{
  "internalOrderId": "ORD-1001",
  "courierPartner": "URBANEBOLT",
  "idempotencyKey": "4c9f7c8b-1f4a-4a7d-9d8d-123456789abc",
  "customer": {
    "name": "John Doe",
    "mobile": "9876543210",
    "email": "john@example.com"
  },
  "address": {
    "address": "MG Road",
    "city": "Bangalore",
    "state": "Karnataka",
    "country": "India",
    "pincode": "560001"
  },
  "items": [
    {
      "sku": "SKU-100",
      "description": "Shoes",
      "quantity": 1,
      "price": 1500
    }
  ]
}
```

---

# Architecture

```
Client

   │

   ▼

Orders Controller

   │

   ▼

Orders Service

   │

   ▼

Courier Factory

   │

   ▼

Urbanebolt Adapter

   │

   ▼

Manifest Service

   │

   ▼

Urbanebolt API
```

---

# Design Highlights

- Factory Pattern for courier selection.
- Adapter Pattern for courier-specific implementation.
- Repository Pattern for database access.
- Redis token caching to reduce authentication requests.
- Modular structure for easy extension with additional courier providers.

---

# Database

PostgreSQL is managed using TypeORM migrations.

Migration commands

```bash
npm run db:generate --name=MigrationName
```

```bash
npm run db:migrate
```

```bash
npm run db:revert
```

---

# Docker

Start services

```bash
docker compose up -d
```

Stop services

```bash
docker compose down
```

---

# Future Improvements

- Shipment Tracking API
- Shipment Cancellation API
- Batch Shipment Processing
- BullMQ Queue Workers
- Webhook Support
- Multiple Courier Integrations
- Authentication & Authorization
- Monitoring and Metrics

---

# Assignment Status

Implemented

- Order Creation
- Courier Factory
- Urbanebolt Integration
- Token Management
- PostgreSQL Integration
- Redis Integration
- Swagger Documentation
- Docker Configuration
- Database Migrations
- Validation