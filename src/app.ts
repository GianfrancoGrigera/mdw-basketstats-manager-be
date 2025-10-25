import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/db";
import dotenv from "dotenv";
import router from "./routes";


dotenv.config();
const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
connectDB();

// Rutas
app.use("/api", router);

export default app;