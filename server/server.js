import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import https from "https";
import dotenv from "dotenv";
import { auth } from "express-openid-connect";
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

// Import routes
import userRoutes from "./routes/userRoutes.js";
app.use("/api/user", userRoutes);

// Paths to SSL certificate and key files
const SSL_OPTIONS = {
  key: fs.readFileSync("./ssl/key.pem"), // Path to private key file
  cert: fs.readFileSync("./ssl/cert.pem"), // Path to certificate file
};

const AUTH0_CONFIG = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: "http://localhost:5173",
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
};

app.use(auth(AUTH0_CONFIG));
// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

const PORT = process.env.EXPRESS_PORT || 4000;

// Start the HTTPS server on port 4000
https.createServer(SSL_OPTIONS, app).listen(PORT, () => {
  console.log(`HTTPS server running on port ${PORT}`);
});
