import bcrypt from "bcrypt";

export async function EncryptPWD(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) reject(err);
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
    });
}

export function comparePassword(password, hashed) {
    return bcrypt.compare(password, hashed);
}
