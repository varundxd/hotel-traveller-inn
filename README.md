# Hotel Traveller Inn 🏨

A premium hotel booking website built with React and Node.js, featuring room booking, restaurant info, and Razorpay payment integration.

## Features
- 🏠 **Premium Landing Page** — Stunning hero section with glassmorphism design
- 🛏️ **Room Booking** — Browse and book from Standard, Deluxe, and Executive rooms
- 🍽️ **Restaurant** — Explore "The Golden Plate" fine dining menu
- 💳 **Razorpay Payments** — Secure checkout with UPI, Cards, Net Banking & Wallets
- ✅ **Booking Confirmation** — Animated success screen after payment

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite) + Vanilla CSS |
| Backend | Node.js + Express |
| Database | SQLite + Prisma ORM |
| Payments | Razorpay |

## Getting Started

### Prerequisites
- Node.js v18+
- Razorpay Test API Keys ([Get them here](https://dashboard.razorpay.com/signup))

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/HotelTravellerInn.git
cd HotelTravellerInn

# Setup Backend
cd backend
npm install
echo "DATABASE_URL=file:./dev.db" > .env
npx prisma db push
node prisma/seed.js

# Setup Frontend
cd ../frontend
npm install
```

### Running

```bash
# Terminal 1 — Backend (port 5001)
cd backend && node src/server.js

# Terminal 2 — Frontend (port 5173)
cd frontend && npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Razorpay Setup
1. Add your test keys to `backend/.env`:
   ```
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=xxxxx
   ```
2. Update the key in `frontend/src/pages/Checkout.jsx`

## Screenshots
Coming soon!

## License
MIT
