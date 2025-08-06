import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import { connectDB } from "./db";
import todoRoutes from "./routes/todo";

dotenv.config({
  path: ".env",
});

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_API_URL,
  })
);
app.use(json());

app.use(todoRoutes);

const PORT = process.env.PORT || "4000";

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
