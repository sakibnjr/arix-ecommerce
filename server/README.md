# Arix API Server

Node.js + Express + MongoDB backend for Arix storefront.

## Setup

1. Create a `.env` in `server/` (keys below):

```
MONGODB_URI=mongodb://127.0.0.1:27017/arix
PORT=4000
CORS_ORIGIN=http://localhost:3000,https://arix-ecommerce.vercel.app
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your_jwt_secret
```

2. Install deps and run:

```
cd server
npm i
npm run dev
```

Health check: GET http://localhost:4000/health

## Endpoints

- GET `/api/products` — list with filters: `search`, `anime`, `category`, `sort`
- GET `/api/products/:id` — get by id
- POST `/api/products` — create product
- POST `/api/orders` — create order, returns `{ orderNo }`
- GET `/api/orders/:orderNo` — fetch order by tracking number

## Models

- Product: name, price, originalPrice, anime, category, sizes, isNew, discount
- Order: orderNo, customer, items, totals, status

## Notes

- Uses `helmet`, `cors`, `morgan` for security/logging
- Validates inputs with `zod`
- Generates short tracking numbers like `ARXABC123`
