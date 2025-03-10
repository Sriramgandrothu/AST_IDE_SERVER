import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import { userRouter } from "./routes/userRouter";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middlewares/verifyToken";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://ast-ide.vercel.app/"],
  })
);
config();

app.use("/compiler",verifyToken, compilerRouter);
app.use("/user",verifyToken, userRouter);
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running smoothly" });
});
dbConnect();
app.listen(4000, () => {
  console.log("Server is running");
});
