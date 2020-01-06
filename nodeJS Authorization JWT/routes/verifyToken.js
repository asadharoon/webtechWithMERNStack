const jwt = require('jsonwebtoken');
const config = require('config');
function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token)
        return res.status(404).send("Access denied");
    try {
        const verified = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(404).send("Invalid token");
    }
};
module.exports = auth;