const { verifyToken } = require("../utils/jwt");

function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            success: false,
            message: "Access Token Missing"
        });

    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = verifyToken(token);

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }

}

module.exports = authMiddleware;