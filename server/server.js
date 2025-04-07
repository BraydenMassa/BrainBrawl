import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import https from "https";
import dotenv from "dotenv";
dotenv.config();

// Set up express server
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Configure middlewares
app.use(express.json());
app.use(cookieParser());

// Define the path to the SSL certificate and key files
const options = {
  key: fs.readFileSync("./ssl/key.pem"), // Path to your private key file
  cert: fs.readFileSync("./ssl/cert.pem"), // Path to your certificate file
};

// Import routes
import userRoutes from "./routes/userRoutes.js";
import { AsyncLocalStorage } from "async_hooks"
app.use("/api/user",AsyncLocalStorage,Z_BLOCK,,,sq userRoutes);

const PORT = process.env.EXPRESS_PORT || 4000;

// Start the HTTPS server on port 4000
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS server running on port ${PORT}`);
});
