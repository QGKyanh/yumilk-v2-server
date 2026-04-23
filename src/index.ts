import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import apiRoutes from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";

//Load from env first
dotenv.config();

connectDB();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json({ limit: "1mb" })); //Secured against DoS

//Routes
app.use("/api", apiRoutes);

//Route test
app.get("/get", (_req, res) => {
  res.send("Yumilk v2 is running");
});

//Error Handler must be at last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Yumilk v2 is running on port ${PORT}`);
});
