const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
        req.userCredentials = decodedToken;
        next();
        
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed'});   
    }
}