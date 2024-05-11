import UserModel from "../models/user.js";
import TransactionModel from "../models/transaction.js";
import { comparePassword } from "../helpers/encrypt.js";
import { authJWT } from "../helpers/auth.js";
import { decodeJWT, parseAuth } from "../helpers/auth.js";

export async function loginAdmin(req, res) {
    try {
        // parse data
        const { email, password } = req.body;

        // find account
        const user = await UserModel.findOne({ email });

        // check if user is valid
        if (!user)
            return res.json({
                error: "invalid user",
            });

        if (user.accountType != "Admin") {
            return res.json({
                error: "Admin Role Not Found",
            });
        }
        // match inputted password with encrypted password
        const match = await comparePassword(password, user.password);
        if (!match)
            return res.json({
                error: "invalid password",
            });

        // generate JWT token
        const token = authJWT(user._id);

        // return status
        return res.json({
            status: "Logged In",
            token: token,
        });
        //
    } catch (error) {
        console.error(error);
    }
}

export async function getDeposits(req, res) {
    // Get JWT token
    const authHeader = req.headers["authorization"];
    // Check if there is a token
    if (!authHeader) {
        console.log("no auth header");
        return res.sendStatus(400);
    }
    try {
        // parse and decode header
        const decoded = decodeJWT(parseAuth(authHeader));
        // find user from token
        const user = await UserModel.findById(decoded);
        // checks if user exists
        if (!user) {
            return res.json({
                error: "user not found",
            });
        }
        // check if account is admin
        if (user.accountType != "Admin") {
            return res.json({
                error: "admin role not found",
            });
        }
        // get deposits
        const deposits = await TransactionModel.find({
            Type: "deposit",
            Confirmed: false,
        });

        //reverses array
        deposits.reverse();

        return res.json(deposits);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

export async function getWithdrawals(req, res) {
    // Get JWT token
    const authHeader = req.headers["authorization"];
    // Check if there is a token
    if (!authHeader) {
        console.log("no auth header");
        return res.sendStatus(400);
    }
    try {
        // parse and decode header
        const decoded = decodeJWT(parseAuth(authHeader));
        // find user from token
        const user = await UserModel.findById(decoded);
        // checks if user exists
        if (!user) {
            return res.json({
                error: "user not found",
            });
        }
        // check if account is admin
        if (user.accountType != "Admin") {
            return res.json({
                error: "admin role not found",
            });
        }
        // get withdrawals
        const withdrawals = await TransactionModel.find({
            Type: "withdrawal",
            Confirmed: false,
        });

        //reverses array
        withdrawals.reverse();

        return res.json(withdrawals);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}
