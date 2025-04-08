import express from "express";

const router = express.Router();

// Import middlewares
import validateEmail from "../middlewares/validateEmail.js";
import validatePassword from "../middlewares/validatePassword.js";

// Import controller functions
import { createUser } from "../controllers/userController.js";
import { getAllUsers } from "../controllers/userController.js";
import { getUserById } from "../controllers/userController.js";

// Configure routes
router.post("/register", validateEmail, validatePassword, createUser);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);

export default router;
