import UserModel from "../models/user.js";
import { comparePassword } from "./encrypt.js";

export async function registerChecks(
    firstName,
    lastName,
    email,
    password,
    res
) {
    //check first name
    if (!firstName)
        return res.json({
            error: "invalid firstName",
        });

    // check last name
    if (!lastName)
        return res.json({
            error: "invalid lastName",
        });

    // check email
    if (!email)
        return res.json({
            error: "invalid email",
        });

    // check password
    if (!password || password.length < 6)
        return res.json({
            error: "invalid password",
        });

    // check if there is a duplicate email
    const exist = await UserModel.findOne({ email });
    if (exist)
        return res.json({
            error: "email taken",
        });
}

export async function loginChecks(user, password, res) {
    // check if user is valid
    if (!user)
        return res.json({
            error: "invalid user",
        });

    // match inputted password with encrypted password
    const match = await comparePassword(password, user.password);
    if (!match)
        return res.json({
            error: "invalid password",
        });
}
