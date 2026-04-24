import express from "express";
import { register } from "../controllers/authController.js";
import { validate } from "../middlewares/validateResource.js";
import { registerSchema } from "../schemas/authSchema.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

export default router;
