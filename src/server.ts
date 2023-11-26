import dotenv from "dotenv";
import express from "express";
import apiRouter from "./routes/api";
import Paths from "./routes/paths";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.DATABASE_URL as string)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Paths.Base, apiRouter);

app.use((err: any, req: any, res: any, next: any) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ error: "Unauthorized" });
  }
});

export default app;
