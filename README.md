# Quentra

Quentra is a hospital queue management system I'm building to help manage patient flow and reduce wait times. It generates digital tokens, tracks queues in real time, and provides separate dashboards for different staff roles.

## Note on Current Status

The UI is built and the backend is set up, but the frontend pages aren't fully wired to the backend flow yet. The database connection works (using Windows Auth) and the routing is up, but tying the exact UI components to their respective backend endpoints is currently a work in progress.

## What's Inside

### For Patients
- **Landing Page**: Basic overview of the app.
- **Queue Display**: A page (`/queue`) where patients can see the current active tokens for different departments (General Medicine, Orthopedics, Pediatrics).
- **Token Generation**: A form to generate a new token and secure a spot for a specific department.

### For Staff
- **Admin Dashboard** (`/admin`): Has an overview mode to see active queues and a control panel for managing system settings.
- **Doctor Dashboard** (`/doctor`): Shows the doctor's personal queue and lets them mark patients as completed, call the next person, or put them on hold.
- **Receptionist Dashboard** (`/receptionist`): For manually adding patients and answering queries.
- **Staff Login** (`/login`): Standard login page.

## Tech Stack

**Frontend:**
- React 19 + Vite
- React Router DOM
- Standard CSS variables for styling 
- React Icons

**Backend:**
- Node.js & Express.js
- MSSQL database connected via `msnodesqlv8` (using Windows Authentication)

## Project Structure

```text
quentra/
├── backend/
│   ├── config/          # Database connection setup
│   ├── controllers/     # Logic for auth, doctors, patients, and queues
│   ├── models/          # DB queries
│   ├── routes/          # Express API routes
│   └── server.js        # Main backend entry point
├── src/
│   ├── assets/          
│   ├── components/      # Shared React components
│   ├── pages/           # Main route components
│   ├── App.jsx          
│   └── main.jsx         
```

## How to run it

### Prerequisites
- Node.js
- SQL Server (locally with Windows Auth)

### 1. Database Setup
1. Open SSMS.
2. Run the provided `.sql` files (`SQLQuery1.sql`, `SQLQuery2.sql`) to create the tables.
3. Make sure your local SQL server name matches the `.env` settings.

### 2. Environment Variables
Create a `.env` in the `backend` folder:
```env
DB_SERVER=YOUR_SERVER_NAME\SQLEXPRESS
DB_NAME=QuentraDB
PORT=5000
```
*(Since it uses Windows Auth with `Trusted_Connection=yes;`, you don't need a DB username/password).*

### 3. Start the dev servers

**Backend:**
```bash
cd backend
npm install
npm run server
```

**Frontend:**
```bash
npm install
npm run dev
```

## What works right now
- DB connection via Windows Auth.
- Frontend routing and the UI layouts for all the dashboard roles.
- The queue polling fetches data, but the end-to-end data flow between frontend actions and backend states is still being ironed out.

## Future Plans
- **Auth**: Actually wire up JWT or sessions for the staff logins.
- **Alerts**: Add SMS/WhatsApp notifications so patients know when their turn is coming up.
- **Wait Time estimation**: Improve the average wait time logic based on historical data.
- **Reporting**: Let admins export CSV/PDF reports on daily hospital traffic.
- **PWA support**: Make it installable on mobile.
