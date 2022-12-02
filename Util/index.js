const jwt = require('jsonwebtoken');

function AuthGuard(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}
 
function GenerateToken(staff) {
    const payload =
    {
        id: staff._id,
        username: staff.username,
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
