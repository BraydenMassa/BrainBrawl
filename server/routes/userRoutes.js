import express from "express";

const router = express.Router();

// Import middlewares
import validateEmail from "../middlewares/validateEmail.js";

// Import controller functions
import { createUser } from "../controllers/userController.js";

// Configure routes
router.post("/", validateEmail, createUser);

export default router;
