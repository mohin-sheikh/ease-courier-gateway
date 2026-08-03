# Design Document

## 1. Objective

Ease Courier Gateway provides a unified API for integrating multiple courier partners through a single interface.

Instead of exposing courier-specific APIs to clients, the gateway hides courier implementations behind common abstractions. This allows new courier partners to be integrated with minimal changes to the core application.

The current implementation integrates with **Urbanebolt** and is designed to support additional courier providers in the future.

---

# 2. System Architecture

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
          ┌────────────────┴────────────────┐
          │                                 │
          ▼                                 ▼
 Urbanebolt Adapter                 Future Courier Adapter
          │
          ▼
     Manifest Service
          │
          ▼
  Urbanebolt REST API
```

The application follows a layered architecture where controllers handle HTTP requests, services contain business logic, repositories manage database operations, and adapters isolate courier-specific implementations.

---

# 3. Order Creation Flow

```text
Client
   │
   ▼
POST /orders
   │
   ▼
Validate Request
   │
   ▼
Orders Service
   │
   ▼
Store Order (PENDING)
   │
   ▼
Courier Factory
   │
   ▼
Urbanebolt Adapter
   │
   ▼
Authentication Service
   │
   ▼
Manifest API
   │
   ▼
Update Order Status
   │
   ▼
Return Response
```

Flow Summary

1. Client submits a shipment request.
2. Request is validated.
3. Order is stored in PostgreSQL.
4. Factory selects the configured courier.
5. Adapter converts the request into courier-specific format.
6. Authentication token is obtained.
7. Manifest API is called.
8. Courier response is stored.
9. Order status is updated.
10. Response is returned to the client.

---

# 4. Bulk Order Flow

```text
Client
   │
   ▼
POST /orders/bulk
   │
   ▼
Validate Request
   │
   ▼
Loop Through Orders
   │
   ▼
Orders Service
   │
   ▼
Courier Factory
   │
   ▼
Urbanebolt
   │
   ▼
Collect Results
   │
   ▼
Return Summary
```

Each order is processed independently. Successful and failed orders are returned separately in the response.

---

# 5. Authentication Flow

```text
Create Shipment
       │
       ▼
Need Access Token
       │
       ▼
Redis Cache
       │
 ┌─────┴─────┐
 │           │
 ▼           ▼
Found     Not Found
 │           │
 ▼           ▼
Use       Database
Token        │
             ▼
      Valid Token?
       │
 ┌─────┴─────┐
 │           │
 ▼           ▼
Yes         No
 │           │
 ▼           ▼
Cache     Authenticate
Redis     Urbanebolt
 │           │
 └─────┬─────┘
       ▼
Call Manifest API
```

The authentication flow minimizes unnecessary login requests by caching access tokens in Redis and persisting them in PostgreSQL.

---

# 6. Project Structure

```text
src
│
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

The project follows a modular architecture where each business domain is isolated into its own module.

---

# 7. Database Design

## Orders

Stores shipment information.

Important fields

- Internal Order ID
- Courier Partner
- Shipment ID
- Tracking Number
- Order Status
- Request Payload
- Response Payload
- Idempotency Key

---

## Tracking History

Stores shipment tracking events for future tracking synchronization.

---

## Courier Tokens

Stores authenticated courier access tokens.

---

## Batch

Reserved for future batch shipment processing.

---

## Audit Log

Reserved for storing application audit events.

---

# 8. Design Patterns

## Factory Pattern

The Courier Factory selects the appropriate courier implementation based on the requested courier partner.

Benefits

- Easy to extend
- Loose coupling
- Centralized courier selection

---

## Adapter Pattern

Each courier implements a common interface while encapsulating provider-specific logic.

Benefits

- Easy integration of new courier partners
- No impact on business logic
- Cleaner separation of responsibilities

---

## Repository Pattern

Repositories encapsulate database operations.

Benefits

- Separation of concerns
- Cleaner services
- Easier testing

---

# 9. Idempotency

The Create Shipment API supports an optional **idempotencyKey**.

If the same key is received multiple times, the existing order is returned instead of creating duplicate shipments.

This prevents duplicate shipment creation caused by retries or network failures.

---

# 10. Error Handling

The application validates all incoming requests before processing.

Common scenarios handled

- Duplicate orders
- Duplicate idempotency requests
- Invalid request payload
- Courier authentication failure
- Courier API failure
- Database exceptions
- Shipment not found

---

# 11. Technology Decisions

| Technology | Reason |
|------------|--------|
| NestJS | Modular and scalable architecture |
| PostgreSQL | Reliable relational database |
| TypeORM | ORM with migration support |
| Redis | Fast token caching |
| Swagger | Interactive API documentation |
| Docker | Consistent local development |
| Axios | HTTP client for courier integrations |

---

# 12. Scalability

The architecture is designed to support future enhancements.

Possible improvements

- Additional courier providers
- Shipment cancellation
- Real-time shipment tracking
- BullMQ background processing
- Scheduled synchronization
- Webhooks
- Monitoring
- Metrics
- Authentication & Authorization
- Rate limiting

---

# 13. Assumptions

- PostgreSQL is available.
- Redis is available.
- Urbanebolt credentials are configured.
- Courier APIs are reachable.
- Requests are authenticated by the courier provider.

---

# 14. Future Improvements

- Courier Cancellation API
- Webhook Processing
- Background Queue Workers
- Automatic Retry Mechanism
- Notification Service
- Multiple Courier Providers
- Monitoring Dashboard
- CI/CD Pipeline
- Distributed Tracing
- Centralized Logging