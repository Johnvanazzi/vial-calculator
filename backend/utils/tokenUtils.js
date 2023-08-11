const jwt = require('jsonwebtoken')

function getUserToken(email) {
    return jwt.sign({email: email}, process.env.jwt_secret, { expiresIn: '24h' });
}

function checkToken(email, token) {
    return jwt.verify(token, process.env.jwt_secret, (error, res) => {
        if (error) {
            return false;
        }

        return res.email === email;
    });
}


module.exports.getUserToken = getUserToken;
module.exports.checkToken = checkToken;