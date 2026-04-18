# SeatLock v1 — Backend

A real-time seat booking API built with Express, MongoDB, and Stripe. It handles user auth, show management, ticket creation, seat locking with timers, order processing, and payment via Stripe.

The core idea is **optimistic concurrency control** — when a user books a ticket, the seat gets locked for 8 minutes using a `lockUntil` timestamp. If they don't pay in time, the lock expires and the seat becomes available again. This prevents double-booking without needing distributed locks.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express 5
- **Database**: MongoDB (via Mongoose)
- **Payments**: Stripe (Payment Intents + Webhooks)
- **Auth**: JWT (stored in HTTP-only cookies)
- **Validation**: express-validator
- **Password hashing**: bcryptjs

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB instance (local or Atlas)
- A Stripe account (for payments)

### Setup

1. Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd SeatLock-v1
npm install
```

2. Create a `.env` file in the root directory (see `.env.example` for reference):

```bash
cp .env.example .env
```

3. Fill in your actual values in `.env`.

4. Start the dev server:

```bash
npm run dev
```

The server runs on `http://localhost:5000` by default (or whatever `PORT` you set).

### Build for production

```bash
npm run build
npm start
```

## API Routes

All routes are prefixed with `/api` except the Stripe webhook.

### Auth (`/api/users`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signup` | No | Create a new account |
| POST | `/login` | No | Log in and get a JWT cookie |
| GET | `/logout` | No | Clear the auth cookie |

### Shows (`/api/shows`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | Yes | Create a new show |
| GET | `/` | No | List all shows (paginated) |
| GET | `/search` | No | Search shows by title/description |
| GET | `/:id` | No | Get a single show by ID |

### Tickets (`/api/tickets`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | Yes | Create a batch of tickets for a show |
| PATCH | `/:ticketId/amount` | Yes | Update ticket price (owner only) |
| GET | `/show/:showId` | No | Get all available tickets for a show |

### Orders (`/api/orders`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | Yes | Book a ticket (creates order + locks seat for 8 min) |
| GET | `/my-orders` | Yes | Get all your orders |
| PATCH | `/cancel/:orderId` | Yes | Cancel an order |

### Payments (`/api/payments`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/checkout` | Yes | Initiate Stripe checkout for an order |
| GET | `/verify/:paymentId` | Yes | Check payment status |

### Webhook

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/webhook` | Stripe webhook (raw body, not JSON-parsed) |

## How Booking Works

1. User clicks "Book Now" on a ticket
2. Server reserves the ticket using optimistic locking (checks version to prevent conflicts)
3. An order is created with `lockUntil` set to current time + 8 minutes
4. User has 8 minutes to complete payment via Stripe
5. On successful payment, Stripe fires a webhook → order is marked as completed
6. If payment fails or time runs out, the seat is released back to available

## Project Structure

```
src/
├── app.ts                  # Express app setup, routes, middleware
├── index.ts                # Server entry point, DB + Stripe init
├── configs/                # Environment variable configs
├── errors/                 # Custom error classes
├── middlewares/             # Auth, error handling, validation
├── modules/
│   ├── users/              # Signup, login, logout
│   ├── shows/              # Show CRUD
│   ├── tickets/            # Ticket creation, pricing, availability
│   ├── orders/             # Order creation, cancellation, seat locking
│   └── payments/           # Stripe integration, checkout, verification
├── types/                  # TypeScript types and enums
├── utils/                  # Transaction helper, Stripe event handler, payment utils
└── wrappers/               # MongoDB and Stripe client wrappers
```

Each module follows the same pattern: `model → repository → service → controller → route`.

## Error Handling

The API uses a centralized error middleware. All errors follow this format:

```json
{
  "errors": [
    { "message": "Something went wrong", "field": "email" }
  ]
}
```

Custom error classes: `BadRequestError`, `NotFoundError`, `ForbiddenError`, `UnauthorizedError`, `RequestValidationError`.

## Notes

- Auth tokens are stored in HTTP-only cookies, not in headers
- The Stripe webhook endpoint (`/webhook`) must receive raw request bodies — it's mounted before `express.json()`
- Optimistic locking on tickets uses Mongoose's `__v` (version key) to detect concurrent modifications
- CORS is configured via the `ORIGIN` env variable
