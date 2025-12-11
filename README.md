# EventHive (MERN)

EventHive is a starter MERN stack for event discovery, booking, and QR check-in. It includes a Node/Express API with MongoDB models plus a Vite/React frontend using Chart.js, QR generation, and react-qr-scanner.

## Structure
- `backend/` Express API, MongoDB models, JWT auth
- `frontend/` React UI, Vite tooling

## Quick start
### Backend
```bash
cd backend
npm install
cp env.sample .env  # add your secrets
npm run dev
```
The API runs at `http://localhost:5000`. Update `CLIENT_ORIGIN` to your frontend URL.

### Frontend
```bash
cd frontend
npm install
cp env.sample .env
npm run dev
```
The app runs at `http://localhost:5173`.

## API notes
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` (Bearer token)
- Events: `GET /api/events`, `POST /api/events` (auth, organizer) to create
- Bookings: `POST /api/bookings` (auth) create booking + QR, `GET /api/bookings` list user bookings
- Check-in: `POST /api/checkin/verify`, `POST /api/checkin/confirm` (auth) for QR scan

## Frontend notes
- Basic pages: login, event listing & booking, dashboard with QR display + simple chart, scanner page using webcam.
- Configure `VITE_API_URL` to point to the backend.

This is a minimal scaffold; extend validation, role checks, analytics, and error handling as you build out production features.

