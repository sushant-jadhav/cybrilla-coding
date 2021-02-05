var config = require('../config/config');

exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.secret, (err, user) => {
            if (err) {
                return res.sendStatus(403).send({
                    error: `Authentication Success. Token.`,
                });
            }

            req.user = user;
            next();
        });
    } else {
    
        result = { 
            error: `Authentication error. Token required.`,
            status: 401
        };

        res.status(401).send(result);
    }
};