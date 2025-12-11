# EventHive Setup Guide

## Prerequisites
- Node.js and npm installed
- MongoDB connection (configured in backend .env)

## Quick Start

### Option 1: Run Both Servers (Recommended)

**Terminal 1 - Backend Server:**
```bash
cd d:\Downloads\EventHive\backend
npm install
npm run dev
```

**Terminal 2 - Frontend Server:**
```bash
cd d:\Downloads\EventHive\frontend
npm install
npm run dev
```

### Option 2: Using Batch File (Windows)
Double-click `start-servers.bat` in the EventHive folder. This will open two command windows and start both servers automatically.

## Server URLs
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/health

## Troubleshooting

### Network Error on Registration
1. Ensure backend server is running on port 5000
2. Check that frontend .env file has: `VITE_API_URL=http://localhost:5000/api`
3. Verify MongoDB connection is working
4. Check browser console for detailed error messages

### Port Already in Use
If port 5000 or 5173 is already in use:
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### MongoDB Connection Issues
- Verify MONGO_URI in backend/.env is correct
- Check internet connection (MongoDB Atlas requires internet)
- Ensure IP whitelist includes your current IP

## Features
- Modern animated UI with hero sections
- User registration and login
- Event discovery and booking
- Team member profiles
- Service offerings
- Responsive design
