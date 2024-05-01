import UserModel from "../models/user.js";
import TransactionModel from "../models/transaction.js";
import { decodeJWT, parseAuth } from "../helpers/auth.js";

export async function newTransaction(req, res) {
    // gets body
    const { amount, method, type } = req.body;
    // gets auth header
    const authHeader = req.headers["authorization"];
    // check if there is an auth header
    if (!authHeader) {
        res.sendStatus(403);
        console.log("no auth header");
    }
    try {
        // decode header
        const decoded = decodeJWT(parseAuth(authHeader));
        // finds user
        const user = await UserModel.findById(decoded);
        // checks if user exists
        if (!user) {
            res.json({
                error: "user not found",
            });
        }
        // create new transaction in database
        await TransactionModel.create({
            accountID: user.id,
            Type: type,
            Amount: amount,
            Method: method,
            Confirmed: false,
        });
        // return status
        res.json({
            status: "Transaction Created",
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: error,
        });
    }
}

export async function getTransactions(req, res) {
    const authHeader = req.headers["authorization"];
    // check if there is an auth header
    if (!authHeader) {
        res.sendStatus(403);
        console.log("no auth header");
    }
    try {
        // decode header
        const decoded = decodeJWT(parseAuth(authHeader));
        // find user using JWT token
        const user = await UserModel.findById(decoded);
        // checks if user exists
        if (!user) {
            res.json({
                error: "user not found",
            });
        }
        // find all transactions with matching accountID
        const transactions = await TransactionModel.find({
            accountID: user.id,
        });
        // returns transactions
        res.json(transactions);
    } catch (error) {
        console.log(error);
        res.json({
            error: error,
        });
    }
}
