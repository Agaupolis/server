import express from "express";
import cors from "cors";

// imports all functions under the name c
import * as auth from "../controllers/auth.js";
import * as user from "../controllers/user.js";
import * as trans from "../controllers/transactions.js";

// define router
const router = express.Router();

// Use cors aka middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173", // client server
    })
);

// POST endpoints
router.post("/api/register", auth.registerUser);
router.post("/api/login", auth.loginUser);
router.post("/api/transactions", trans.newTransaction);

// GET endpoints
router.get("/api/userData", user.userData);
router.get("/api/transactions", trans.getTransactions);

//exports routes
export default router;
