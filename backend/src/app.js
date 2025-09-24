import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as authRouter } from "./route/authRoutes.js";
import { router as folioRouter} from "./route/folioRoutes.js";


const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());

// (Optional) If you're sending URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cookieParser());

//routes
app.use("/", authRouter);
app.use("/folio", folioRouter);

export { app };
