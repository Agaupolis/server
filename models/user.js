import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
        role: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        totalWithdrawals: { type: Number },
        totalDeposits: { type: Number },
        netProfit: { type: Number },
        currentEquity: { type: Number },
    },
    { collection: "users" }
);

const UserModel = mongoose.model("users", User);

export default UserModel;
