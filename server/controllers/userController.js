import { sql } from "../database/dbConfig.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name field required" });
  }
  try {
    const [existingUser] =
      await sql`SELECT user_id FROM users WHERE email = ${email}`;
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [newUser] =
      await sql`INSERT INTO users(name, email, password) VALUES(${name}, ${email}, ${hashedPassword}) RETURNING user_id`;
    return res.status(200).json({ userId: newUser.userId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error registering user" });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await sql`SELECT user_id, name, email FROM users`;
  return res.status(200).json(users);
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "Missing userId param" });
  }
  try {
    const [user] =
      await sql`SELECT user_id, name, email FROM users WHERE user_id = ${userId}`;
    if (!user) {
      return res.status(404).json({ error: "User not found with that userId" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error getting user by ID" });
  }
};
