# Interview System

An end-to-end recruitment and interview management platform designed to connect recruiters and students through an interactive dashboard experience.

## Description

The Interview System is built to streamline the recruitment process. It features distinct dashboard designs for both recruiters and students, utilizing real-time communications, secure authentication, and a scalable data model.

## Architecture & Technologies Used

### Frontend (React + Vite)

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM 7
- **Icons**: Lucide React & React Icons
- **Real-time Client**: Socket.io-client

### Backend (Node.js + Express)

- **Server**: Express.js
- **Database ORM**: Mongoose (MongoDB)
- **Authentication**: JSON Web Tokens (jsonwebtoken) & bcryptjs for password hashing
- **Real-time Server**: Socket.io
- **Environment**: dotenv

## Project Structure & Key Components

The frontend architecture is organized into several key modules:

- **Core Views**: `App Core`
- **Dashboard Navigations**: `Student Nav`, `Recruiter Nav`, `Navbar`
- **User Roles**: `Student`, `Recruiter`, `Login`
- **UI Blocks**: `Cards`, `Box`, `Builder`, `Hero`, `List`, `CallToAction`

The backend manages data logic and connectivity:

- **Models** (`backend/models/`): Defines structures for `Job`, `User`, `Application`, and `Interview`.
- **Middleware** (`backend/middleware/`): Protects routes via an `auth.js` mechanism.
- **Server** (`backend/server.js`): Initialization point handling REST APIs and WebSocket connections.

There is also a `Design/` folder preserving earlier exploratory HTML mockups (Aura Intelligence, Obsidian Recruiter dashboard, Student Dashboard).

## Getting Started

### Prerequisites

- Node.js
- MongoDB connection string (set up in a `.env` file)

### Installation

1. **Install Frontend Dependencies:**

   ```bash
   npm install
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

### Running the App

Run both the Vite dev server and Node matching background server:

**Frontend:**

```bash
npm run dev
```

**Backend:**

```bash
cd backend
npm run start
```
