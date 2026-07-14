const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
require("./database/database");

const app = express();

// Security
app.use(helmet());

app.use(cors());
app.use(express.json());

// Rate Limiter
const otpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many OTP requests. Please try again after 10 minutes."
    }
});

app.use("/send-otp", otpLimiter);


app.use(authRoutes);


app.get("/dashboard", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Never Gave Up",
        user: req.user
    });
});

// Home Route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});