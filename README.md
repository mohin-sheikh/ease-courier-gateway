# Ease Courier Gateway

A scalable courier aggregation service built with **NestJS** that provides a unified API for integrating multiple courier partners.

The application hides courier-specific implementations behind a common interface, making it easy to integrate additional courier providers without changing business logic.

Currently, **Urbanebolt** is implemented as the first courier partner using the **Factory** and **Adapter** design patterns.

---

# Features

- Unified Shipment Creation API
- Bulk Shipment Creation API
- Shipment Tracking API
- Factory Pattern for Courier Selection
- Adapter Pattern for Courier Integration
- PostgreSQL with TypeORM
- Redis Token Caching
- Swagger API Documentation
- Docker Support
- Database Migrations
- Request Validation
- Idempotency Support
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
| Docker | Local Development |

---

# Project Structure

```text
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

# Prerequisites

Before running the application, make sure the following are installed:

- Node.js 22+
- npm
- Docker
- Docker Compose
- PostgreSQL (or use Docker)
- Redis (or use Docker)

---

# Environment Variables

Create a `.env` file using `.env.example`.

| Variable | Description |
|----------|-------------|
| PORT | Application Port |
| DB_HOST | PostgreSQL Host |
| DB_PORT | PostgreSQL Port |
| DB_USERNAME | PostgreSQL Username |
| DB_PASSWORD | PostgreSQL Password |
| DB_DATABASE | Database Name |
| REDIS_HOST | Redis Host |
| REDIS_PORT | Redis Port |
| REDIS_PASSWORD | Redis Password |
| URBANEBOLT_BASE_URL | Urbanebolt Base URL |
| URBANEBOLT_USERNAME | Urbanebolt Username |
| URBANEBOLT_PASSWORD | Urbanebolt Password |
| URBANEBOLT_CUSTOMER_CODE | Urbanebolt Customer Code |

---

# Installation

Clone the repository.

```bash
git clone <repository-url>

cd ease-courier-gateway
```

Install dependencies.

```bash
npm install
```

---

# Start PostgreSQL & Redis

```bash
docker compose up -d
```

---

# Run Database Migration

```bash
npm run db:migrate
```

---

# Start the Application

```bash
npm run start:dev
```

Application

```
http://localhost:3000
```

Swagger

```
http://localhost:3000/docs
```

---

# Available APIs

## Health

```
GET /health
```

Returns the application health status.

---

## Create Shipment

```
POST /orders
```

Creates a shipment using the selected courier partner.

---

## Bulk Create Shipments

```
POST /orders/bulk
```

Creates multiple shipments in a single request.

---

## Track Shipment

```
GET /tracking/{trackingNumber}
```

Returns the latest shipment status for the provided tracking number.

---

# Sample Create Order Request

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

# Authentication Flow

```
Client Request
      │
      ▼
Orders Service
      │
      ▼
Need Access Token
      │
      ▼
Redis Cache
      │
 ┌────┴────┐
 │         │
 ▼         ▼
Found    Not Found
 │         │
 ▼         ▼
Use      Database
Token      │
           ▼
     Valid Token?
      │
 ┌────┴────┐
 │         │
 ▼         ▼
Yes       No
 │         │
 ▼         ▼
Cache   Authenticate
Redis   with Urbanebolt
 │         │
 └────┬────┘
      ▼
Call Manifest API
```

---

# Architecture

```text
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

# Design Patterns

### Factory Pattern

Selects the appropriate courier implementation based on the requested courier partner.

### Adapter Pattern

Encapsulates courier-specific implementation behind a common interface.

### Repository Pattern

Separates database access from business logic.

---

# Idempotency

The Create Shipment API supports an optional **idempotencyKey**.

If the same key is received multiple times, the existing order is returned instead of creating duplicate shipments.

---

# Database

The application uses **TypeORM Migrations**.

Generate Migration

```bash
npm run db:generate --name=MigrationName
```

Run Migration

```bash
npm run db:migrate
```

Rollback Migration

```bash
npm run db:revert
```

---

# Available Scripts

Start Development Server

```bash
npm run start:dev
```

Build

```bash
npm run build
```

Run Linter

```bash
npm run lint
```

Run Tests

```bash
npm test
```

---

# Docker

Start Services

```bash
docker compose up -d
```

Stop Services

```bash
docker compose down
```

---

# Future Improvements

- Courier Cancellation API
- Real-time Tracking Synchronization
- BullMQ Queue Workers
- Retry Mechanism
- Webhook Support
- Additional Courier Integrations
- Monitoring & Metrics
- Authentication & Authorization
- Rate Limiting

---

# Assignment Deliverables

- REST APIs using NestJS
- PostgreSQL Integration
- Redis Token Caching
- Urbanebolt Courier Integration
- Factory Pattern
- Adapter Pattern
- Repository Pattern
- Swagger Documentation
- Docker Configuration
- Database Migrations
- Request Validation
- Idempotency Support
- Bulk Shipment API
- Shipment Tracking API
- Design Documentation
