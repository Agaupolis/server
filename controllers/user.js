import UserModel from "../models/user.js";
import { decodeJWT, parseAuth } from "../helpers/auth.js";

// get user data using jwt token
export async function userData(req, res) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.sendStatus(403);
            console.log("no auth header");
        }

        const decoded = decodeJWT(parseAuth(authHeader));

        const user = await UserModel.findById(decoded);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.json({
            error: error,
        });
    }
}
