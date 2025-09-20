import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import uploadsRouter from "./routes/uploads.js";
import authRouter from "./routes/auth.js";
import slidersRouter from "./routes/sliders.js";

dotenv.config();

const app = express();

app.use(helmet());
// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = process.env.CORS_ORIGIN?.split(",").map((url) =>
      url.trim()
    ) || [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://arix-ecommerce.vercel.app",
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      console.log("Allowed origins:", allowedOrigins);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/uploads", uploadsRouter);
app.use("/api/sliders", slidersRouter);
app.use("/api/auth", authRouter);

// Basic error handler to prevent crashes
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/arix";
const PORT = process.env.PORT || 4000;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
