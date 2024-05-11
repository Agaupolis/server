import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import Routes from "./routes/Routes.js";

// Pull data from .env file
const MONGOURL = process.env.MONGOURL;
const PORT = process.env.PORT;

// define app
const app = express();

// Middle Ware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/", Routes);

// Database Connect
await mongoose
    .connect(MONGOURL)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Database Connection Error :", err));

// Server Start
app.listen(PORT, () => {
    console.log("Server Running |", PORT);
});
