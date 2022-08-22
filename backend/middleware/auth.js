const jwt = require("jsonwebtoken")

// Check if user is logged in
const auth = (req, res, next) => {
    const token = req.header("x-auth-token")

    if(!token) return res.status(401).send("Access denied. Not authenticated.")

    try {
        const secretKey = process.env.JWT_SECRET_KEY
        const user = jwt.verify(token, secretKey)

        req.user = user

        next();
    } catch (error) {
        res.status(400).send("Access denied. Invalid auth token.")
    }
};

// Check if user requesting has permission
const isUser = (req, res, next) => {
    auth(req, res, () => {
        if (req.user._id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).send("Access denied. Not authorized");
        }
    })
};

// Check if the suer requesting is an admin
const isAdmin = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).send("Access denied. Not authorized.")
        }
    })
};

module.exports = { auth, isUser, isAdmin }