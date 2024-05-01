import jwt from "jsonwebtoken";
import "dotenv/config";

export function authJWT(id) {
    // converts the ID object to string
    const idString = id.toString();
    // create a token and sign it to a variable
    const token = jwt.sign(idString, process.env.JWTsecret);

    // returns generated token
    return token;
}

export function decodeJWT(token) {
    // verifies and returns token
    return jwt.verify(token, process.env.JWTsecret);
}

export function parseAuth(header) {
    const split = header.split(" ");
    return split[1];
}
