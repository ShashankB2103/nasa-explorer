
#  NASA Explorer

A visually rich and interactive full-stack web application that allows users to explore real-time data from NASA’s public APIs. Built with React, Express, MongoDB, and JWT-based authentication, this project showcases modern frontend design, backend API integration, protected routes, and responsive UI/UX.

---

##  Live Demo

> Coming soon — deployed using **Vercel (frontend)** and **Render (backend)**.

---

## Tech Stack

| Layer       | Technologies                                |
|-------------|---------------------------------------------|
| Frontend    | React (JavaScript), Bootstrap, Axios        |
| Backend     | Node.js, Express, TypeScript                |
| Database    | MongoDB (for JWT-authenticated users)       |
| Auth        | JSON Web Tokens (JWT) + bcrypt              |
| Charts      | Recharts                                    |
| Deployment  | Vercel (frontend), Render (backend)         |

---

## Features

### NASA Data Endpoints Implemented

- ** APOD (Astronomy Picture of the Day) — view and filter images by date
- ** Mars Rover Photos— filter by Sol and camera, view gallery with lightbox
- ** Near Earth Objects (NEO) — show data in charts + table format
- ** EPIC Camera — carousel of Earth images from Lagrange Point
- ** NASA Image Library — search image archive with metadata preview

---

### Authentication System

- Register/Login pages styled with Bootstrap
- Secure password hashing using bcrypt
- Generates JWT token on login
- Stores token in `localStorage`
- Protects sensitive frontend routes using a reusable `<PrivateRoute />` component
- Adds dynamic auth-aware navigation:
  - Not logged in → shows Register / Login
  - Logged in → shows Profile / Logout
- Logout clears token and redirects to Login

---

##  Bonus Features

- Responsive design across devices
- odal previews (Mars, Library)
- Carousel for EPIC
- Pagination (Mars Rover)
- Token-based protected API calls
- Filter + search support on multiple endpoints
- Error and loading state handling throughout

---

##  Project Structure
nasa-explorer/
├── backend/ # Node.js + TypeScript API server
│ ├── routes/ # API routes (APOD, Mars, Neo, EPIC, Auth)
│ ├── models/ # Mongoose user model
│ ├── middleware/ # JWT auth middleware
│ ├── config/ # MongoDB connection
│ └── index.ts # Express server entrypoint
│
├── frontend/ # React app (JavaScript + Bootstrap)
│ ├── pages/ # APOD, MarsRover, Register, Login, etc.
│ ├── components/ # Navbar, ProtectedRoute
│ └── App.js # Main routes and layout
│
└── README.md

Setup Instructions

Backend

```bash
cd backend
npm install
npm run dev

Frontend

cd frontend
npm install
npm start
```
Auth Implementation Summary

| Feature           | Status                     |
| ----------------- | -------------------------- |
| Register/Login    | ✅ Complete                 |
| JWT Token Storage | ✅ localStorage             |
| Protected Routes  | ✅ via `<PrivateRoute />`   |
| Logout            | ✅ Clears token + redirects |
| Token usage       | ✅ Axios with bearer header |

Planned additions:
-Jest for backend and React components
-Mock API tests with Supertest
-Auth token expiration test cases
