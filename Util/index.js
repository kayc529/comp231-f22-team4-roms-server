const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors');

function AuthGuard(req, next)
{
    if(!req.isAuthenticated())
    {
        throw new Unauthorized.UnauthorizedError('Please login first!');
    }
    next();
}
 
function GenerateToken(staff) {
    const payload =
    {
        id: staff._id,
        username: staff.username,
        role: staff.role
    }

    const jwtOptions =
    {
        expiresIn: 604800
    }

    return jwt.sign(payload, 'Secret', jwtOptions);
}

module.exports = {
    AuthGuard,
    GenerateToken
};
