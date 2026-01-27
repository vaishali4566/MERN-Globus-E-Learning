import express from "express";
import cors from "cors";

import loadRoutes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

/* ---------- Global Middlewares ---------- */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,               
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

/* ---------- Routes ---------- */
loadRoutes(app);

              

/* ---------- Error Handler (ALWAYS LAST) ---------- */
app.use(errorHandler);

export default app;
