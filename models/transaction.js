import mongoose from "mongoose";

const Transactions = new mongoose.Schema(
    {
        accountID: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        Type: { type: String, required: true },
        Amount: { type: Number, required: true },
        Method: { type: String, required: true },
        Confirmed: { type: Boolean, required: true },
        Date: { type: String },
    },
    { collection: "Transactions" }
);

const TransactionModel = mongoose.model("Transactions", Transactions);

export default TransactionModel;
