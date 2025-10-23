import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/db";
import dotenv from "dotenv";


dotenv.config();
const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
connectDB();

// Rutas
// app.use("/api/auth", authRoutes);

export default app;