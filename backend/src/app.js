import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "20kb" }));
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));

//import routes
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users",  userRouter);

export { app };
