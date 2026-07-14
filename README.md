# Secure Authentication System

A secure phone number authentication system built using Node.js, Express.js, JWT, SQLite, and Twilio SMS. This project demonstrates a modular authentication workflow with OTP verification, token-based authentication, and backend security best practices.

---

## Overview

This project provides a complete phone authentication flow where users verify their identity using a one-time password (OTP). After successful verification, a JSON Web Token (JWT) is generated to authenticate protected routes.

The application follows a modular backend architecture, separating routes, controllers, middleware, services, and utilities to improve maintainability and scalability.

---

## Features

- Phone number authentication
- OTP generation and verification
- Twilio SMS integration
- JWT authentication
- Protected API routes
- OTP expiration
- Rate limiting
- Helmet security headers
- SQLite database
- Modular backend architecture
- Responsive frontend

---

## Technology Stack

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- SQLite
- JWT (JSON Web Token)
- Twilio
- Helmet
- Express Rate Limit

---

## Project Structure

```
secure-authentication/
│
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   ├── script.js
│   ├── style.css
│   └── assets/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── database/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## Installation

Clone the repository.

```bash
git clone https://github.com/anandans5/secure-authentication.git
```

Navigate to the backend directory.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

The backend runs on:

```
http://localhost:5000
```

---

## Environment Variables

Create a `.env` file inside the `backend` directory.

```
JWT_SECRET=your_secret_key

TWILIO_ACCOUNT_SID=your_account_sid

TWILIO_AUTH_TOKEN=your_auth_token

TWILIO_PHONE_NUMBER=your_twilio_number
```

---

## Authentication Flow

```
User

    │

    ▼

Enter Phone Number

    │

    ▼

Generate OTP

    │

    ▼

Send OTP via Twilio

    │

    ▼

Verify OTP

    │

    ▼

Generate JWT

    │

    ▼

Access Protected Routes
```

---

## Security Features

- JWT-based authentication
- OTP expiration
- One-time verification flow
- Rate limiting
- Helmet security middleware
- Secure API design
- Protected endpoints
- Input validation

---

## Future Improvements

- PostgreSQL integration
- Redis OTP storage
- Refresh tokens
- User profile management
- Session management
- Docker support
- CI/CD pipeline
- Unit and integration testing

---

## Developer

**Anandan S**

LinkedIn

https://linkedin.com/in/anandans05

GitHub

https://github.com/anandans5

---

## License

This project is intended for educational purposes and portfolio demonstration.
