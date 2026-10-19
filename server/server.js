
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { db, bcrypt } = require("./database");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5174"
}));
app.use(express.json());

const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { message: "Too many signup attempts. Try again later." }
});

app.get("/", (req, res) => {
  res.json({ message: "THRIFT backend is running!" });
});

app.post("/api/signup", signupLimiter, async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name?.trim() || !email?.trim() || !phone?.trim() || !password) {
      return res.status(400).json({
        message: "Please fill in all fields."
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = db
      .prepare("SELECT id FROM users WHERE email = ?")
      .get(normalizedEmail);

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = db.prepare(`
      INSERT INTO users (name, email, phone, password)
      VALUES (?, ?, ?, ?)
    `).run(name.trim(), normalizedEmail, phone.trim(), hashedPassword);

    return res.status(201).json({
      message: "Your THRIFT account was created successfully!",
      user: {
        id: result.lastInsertRowid,
        name: name.trim(),
        email: normalizedEmail
      }
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({
      message: "Something went wrong. Please try again."
    });
  }
});

app.listen(PORT, () => {
  console.log(`THRIFT server running on http://localhost:${PORT}`);
});
