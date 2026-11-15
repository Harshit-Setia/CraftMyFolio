import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as authRouter } from "./routes/authRoutes.js";
import { router as folioRouter} from "./routes/folioRoutes.js";
import { consoleLogger, fileLogger } from "./utils/logger.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("trust proxy", true); 
app.use(consoleLogger);
app.use(fileLogger);

app.use(cookieParser());

app.use("/", authRouter);
app.use("/folio", folioRouter);

app.use((err, req, res, next) => {
  const statusCode =
    err.name === "ValidationError" ? 400 : res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
});


export { app };
