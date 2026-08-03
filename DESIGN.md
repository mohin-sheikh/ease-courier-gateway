# Design Document

## 1. Objective

The Ease Courier Gateway is designed to provide a unified interface for integrating multiple courier partners through a single API.

Instead of exposing courier-specific APIs to clients, the gateway abstracts the implementation details behind a common interface, making it easy to add or replace courier providers without affecting the application.

The current implementation integrates with Urbanebolt and is designed to support additional courier providers in the future.

---

# 2. System Architecture

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
          ┌────────────────┴────────────────┐
          │                                 │
          ▼                                 ▼
 Urbanebolt Adapter                Future Courier
          │
          ▼
   Manifest Service
          │
          ▼
 Urbanebolt API
```

---

# 3. Request Flow

1. Client sends a shipment creation request.
2. Request is validated.
3. Order is stored in PostgreSQL.
4. Courier Factory selects the configured courier.
5. Urbanebolt Adapter converts the request into Urbanebolt format.
6. Authentication token is obtained.
7. Manifest API is called.
8. Response is stored.
9. Order status is updated.
10. Response is returned to the client.

---

# 4. Project Structure

```
src
│
├── common
│
├── config
│
├── couriers
│   ├── adapters
│   ├── factory
│   ├── interfaces
│   ├── shared
│   └── urbanebolt
│
├── database
│
├── modules
│   ├── orders
│   ├── tracking
│   ├── batch
│   └── audit
│
├── queue
│
└── shared
```

The project follows a modular architecture where each feature is isolated into its own module.

---

# 5. Database Design

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

---

## Tracking History

Stores shipment tracking events received from courier partners.

---

## Courier Tokens

Stores authentication tokens for courier APIs.

---

## Batch

Supports future batch shipment processing.

---

## Audit Log

Stores important application events for debugging and auditing.

---

# 6. Design Patterns

## Factory Pattern

The Courier Factory selects the appropriate courier implementation based on the requested courier partner.

Benefits

- Easy to extend
- Loose coupling
- Single entry point

---

## Adapter Pattern

Each courier implements a common interface.

Benefits

- Courier-specific logic remains isolated.
- Easy to onboard new courier partners.

---

## Repository Pattern

Database operations are encapsulated inside repositories.

Benefits

- Separation of concerns
- Easier testing
- Cleaner business logic

---

## 7. Authentication Flow

```
               API Request
                    │
                    ▼
        UrbaneboltAuthService
                    │
                    ▼
          Check Redis Cache
                    │
         ┌──────────┴──────────┐
         │                     │
         ▼                     ▼
   Token Exists         Token Not Found
         │                     │
         ▼                     ▼
  Return Token         Check Database
                               │
                     ┌─────────┴─────────┐
                     │                   │
                     ▼                   ▼
               Token Valid         Token Missing/Expired
                     │                   │
                     ▼                   ▼
            Cache in Redis     Login to Urbanebolt API
                     │                   │
                     ▼                   ▼
               Return Token      Save Token (DB + Redis)
                                         │
                                         ▼
                                   Return Token
```

---

# 8. Error Handling

The application validates all incoming requests before processing.

Common scenarios

- Duplicate orders
- Invalid request payload
- Authentication failure
- Courier API failure
- Database exceptions

---

# 9. Scalability

The architecture is designed for future growth.

Possible enhancements

- Additional courier integrations
- Background processing with BullMQ
- Shipment tracking
- Webhooks
- Rate limiting
- Monitoring
- Authentication and authorization

---

# 10. Assumptions

- PostgreSQL and Redis are available.
- Courier credentials are provided through environment variables.
- Courier APIs are reachable from the application.

---

# 11. Future Improvements

- Shipment Tracking API
- Shipment Cancellation
- Batch Processing
- Queue Workers
- Retry Mechanism
- Notification Service
- Metrics and Monitoring
- CI/CD Pipeline