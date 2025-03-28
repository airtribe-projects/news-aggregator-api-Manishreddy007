const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
    const tokenHeader = req.headers.authorization?.split(" ")[1];
    console.log(tokenHeader);
    if (!tokenHeader) {
        return res.status(401).send({ message: "Token is required" });
    }
    try {
        const decodedToken = jwt.verify(tokenHeader, JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (e) {
        return res.status(401).send({ message: "Invalid Token" });
    }
};

module.exports = { validateToken };