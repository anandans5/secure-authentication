const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

function generateToken(phone) {

    return jwt.sign(
        {
            phone: phone
        },
        SECRET,
        {
            expiresIn: "7d"
        }
    );

}

function verifyToken(token) {

    return jwt.verify(token, SECRET);

}

module.exports = {
    generateToken,
    verifyToken
};