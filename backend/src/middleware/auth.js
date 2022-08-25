var jwt = require("jsonwebtoken");

function generateAccessToken(user) {
    return jwt.sign(user, process.env.SECRET, { expiresIn: '1800s' });
}

function authenticateToken(req, res, next) {
    const authenticate = req.headers['authorization'];
    const token = authenticate && authenticate.split(' ')[1];
    if (!token)
        return res.status(401).json({
            "msg": "No token, authorization denied"
        })
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err)
            return res.status(401).json({
                "msg": "Token is not valid"
            })
        req.user = user;
        next();
    });
}

module.exports = {
    generateAccessToken,
    authenticateToken
}