import express from "express";
import cors from "cors";

// imports all functions under the name c
import * as auth from "../controllers/auth.js";
import * as user from "../controllers/user.js";
import * as trans from "../controllers/transactions.js";
import * as admin from "../controllers/admin.js";

// define router
const router = express.Router();

// Use cors aka middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173", // client server
    })
);

// CLIENT POST endpoints
router.post("/api/client/login", auth.loginUser);
router.post("/api/client/transactions", trans.newTransaction);

// CLIENT GET endpoints
router.get("/api/client/userData", user.userData);
router.get("/api/client/transactions", trans.getTransactions);

// ADMIN POST endpoints
router.post("/api/admin/login", admin.loginAdmin);

// ADMIN GET endpoints
router.get("/api/admin/deposits", admin.getDeposits);
router.get("/api/admin/withdrawals", admin.getWithdrawals);
router.get("/api/admin/userData", user.userData);

//exports routes
export default router;
