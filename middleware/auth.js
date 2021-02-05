const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
    // * Get the tokken from header
    const token = req.header('x-auth-token');
    // * Check if not taken
    if (!token) {
        return res.status(400).json({ msg: 'No Token, Authorization Denied' })
    }
    // * Verify Token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user;
        next()
    }
    catch (err) {
        res.status(401).json({ msg: "Token is not valid" })
    }
}