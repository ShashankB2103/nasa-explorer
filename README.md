 NASA Space Explorer — Full-Stack Application

This repository contains a full-stack application that integrates various NASA APIs to explore astronomy images, Mars rover data, Earth imagery, and more. The app features authentication, interactive filters, data visualization, and even an AI-generated space fact generator .



NASA Explorer Project – Local Setup & Tooling Guide
===================================================

Summary of Preferences
--------------------------
| Setting        | Decision                                |
| -------------- | --------------------------------------- |
| Language       | TypeScript for Backend, JS for Frontend |
| CSS Framework  | Bootstrap                               |
| Chart Library  | Recharts                                |
| Deployment     | Vercel (Frontend), Render (Backend)     |
| Authentication | JWT Auth                                |

Tooling & App Setup Checklist (Local Development)
====================================================

 Core Applications to Install
-----------------------------------
| Tool                             | Purpose                                   | Install Link                                         |
| -------------------------------- | ----------------------------------------- | ---------------------------------------------------- |
| Node.js (v18+)                   | JavaScript runtime for frontend/backend   | https://nodejs.org/                                  |
| npm                              | Package manager                           | Comes with Node.js                                   |
| VS Code                          | Code editor with rich extensions          | https://code.visualstudio.com/                       |
| Git                              | Version control system                    | https://git-scm.com/                                 |
| Postman                          | API testing and debugging tool            | https://www.postman.com/                             |
| MongoDB Compass                  | Local DB visualizer                       | https://www.mongodb.com/products/compass             |


 NPM Packages You’ll Use
==============================

Backend (Node.js + Express + TypeScript)
-------------------------------------------
npm install express cors dotenv axios
npm install --save-dev typescript ts-node nodemon @types/node @types/express

JWT Auth (Backend)
----------------------
npm install jsonwebtoken bcrypt
npm install --save-dev @types/jsonwebtoken @types/bcrypt

Frontend (React + Bootstrap + Axios + Recharts)
--------------------------------------------------
npx create-react-app frontend
npm install bootstrap axios react-router-dom recharts

Why Recharts?
=================
| Feature     | Recharts                           | Chart.js                            |
| ----------- | ---------------------------------- | ----------------------------------- |
| Integration | React-first, uses JSX              | DOM canvas-based                    |
| Ease of Use | Easy to customize, readable config | More imperative setup               |
| Performance | Excellent for dashboards           | Slightly heavier for complex charts |
| Community   | Well-supported for React           | Larger general JS community         |

JWT Auth

| Benefit                         | Why It Helps                    |
| ------------------------------- | ------------------------------- |
| Real-world readiness            | Aligns with industry standards  |
| Backend architecture experience | Secure routes, token management |

Project Structure

/nasa-explorer
│
├── /backend               # Node.js + Express + TypeScript backend
│   ├── /routes            # All route handlers for APIs
│   ├── /models            # MongoDB models (User)
│   ├── /middleware        # Auth middleware for JWT
│   ├── /config            # MongoDB connection setup
│   └── index.ts           # Entry point
│
├── /frontend              # React frontend
│   ├── /pages             # APOD, Mars Rover, NEO, etc.
│   ├── /components        # PrivateRoute, Navbar (if used)
│   ├── /context           # AuthContext for login state
│   ├── App.js             # Main routing file
│   └── index.js           # React entry point
│
└── README.md              # This file

Backend Setup

1. Install Dependencies

cd backend
npm install

# Required packages:
npm install express cors dotenv mongoose axios jsonwebtoken bcrypt
npm install --save-dev typescript ts-node nodemon @types/node @types/express

2. Create .env file

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nasa-explorer
JWT_SECRET=your_secure_secret
NASA_API_KEY=your_nasa_api_key

3. Start Backend

npm run dev

Runs on: http://localhost:5000

Frontend Setup

1. Install Dependencies

cd frontend
npm install

# Required packages:
npm install axios bootstrap react-router-dom

2. Start Frontend

npm start

Runs on: http://localhost:3000

Features Implemented

NASA API Integrations

APOD (Astronomy Picture of the Day) with date filter

Mars Rover Explorer with rover, camera, sol filtering + pagination + lightbox

NEO Dashboard with data visualization using Recharts

EPIC Viewer with carousel image preview

NASA Image & Video Library search + modal viewer

Authentication

JWT-based login & register

MongoDB storage

Protected Profile route with user info

Navbar updates on login/logout

AI Feature

Space Fact Generator using Hugging Face’s GPT2 API

Caches facts once per day

Bonus Features (Challenge Checklist)



Testing - 

Jest for backend (unit & API test)-

Dependencies:

npm install --save-dev jest ts-jest supertest @types/jest @types/supertest typescript ts-node
Configuration at package.json
"jest": {
  "preset": "ts-jest",
  "testEnvironment": "node",
  "moduleFileExtensions": ["ts", "js", "json"],
  "testMatch": ["**/tests/**/*.test.ts"]
}

Test Directory Structure
src/
  └── tests/
       ├── auth.test.ts
       ├── apod.test.ts
       ├── mars.test.ts
       ├── neo.test.ts
       ├── epic.test.ts
       ├── library.test.ts
       └── space-fact.test.ts


Run Tests:

npm run test  // from backend directory.
To run tests in watch mode:
npm run test -- --watch
React Testing Library for frontend components

Deployment (Planned)

Frontend: Vercel

Backend: Render

---Commands Reference

Backend

npm run dev       # Start development server

Frontend

npm start         # Start React development server

---Contributing

PRs and feedback welcome. This project was built as a showcase for full-stack skills, NASA API usage, JWT auth, and UI polish.

Contact

Author: Shashank B
GitHub: github.com/ShashankB2103

