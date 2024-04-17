require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";

export const app = express();
// body parser
// the limit of the body parser when using cloudinary
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors means cross origin resource sharing
// used to safeguard against illegal server access
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// routes
app.use("/api/v1", userRouter);

app.use("/api/v1", courseRouter);

app.use("/api/v1", orderRouter);

app.use("/api/v1", notificationRouter);

app.use("/api/v1", analyticsRouter);

app.use("/api/v1", layoutRouter);

// testing API
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// unknown routes
// prevent access by unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.status = 404;
  next(err);
});

app.use(ErrorMiddleware);
