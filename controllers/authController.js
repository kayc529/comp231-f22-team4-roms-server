const Staff = require('../models/Staff');
const { StatusCodes } = require('http-status-codes');
const passport = require('passport');
const GenerateToken = require('../Util');
const BadRequestError = require('../errors');

const ProcessSignInPage = (req, res, next) =>
{
    passport.authenticate('local', function(err, staff, info)
    {
        if(!staff)
        {
            return res.json({success: false, message: 'ERROR: Authentication Failed'});
        }

        req.logIn(staff, function(err)
        {
            const authToken = GenerateToken.GenerateToken(staff);

            return res.json({success: true, message: 'Staff Logged In Successfully', staff:
                {
                    id: staff._id,
                    username: staff.username,
                    role: staff.role
                }, token: authToken
            })
        });

        return;
    })(req, res, next);
}

const ProcessSignUpPage = (req, res) =>
{
    let newStaff = new Staff
    ({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });

    Staff.register(newStaff, req.body.password, function (err)
    {
        if(err)
        {
            if(err.name == "UserExistsError")
            {
                console.error('ERROR: User Already Exists!');
            }
            else
            {
                console.error(err.name);
            }
            return res.json({success: false, message: "ERROR: Registration Failed!"});
        }

        return res.json({success: true, message: "User Registered Successfully!"});
    });
}

const ProcessSignOutPage = (req, res) =>
{
    req.logOut(function(err)
    {
        if(err)
        {
            throw new BadRequestError.BadRequestError('Server Error!');
        }

        console.log('User Logged Out');
    });

   res.json({success: true, message: "User Logged Out Successfully!"});
}

module.exports = {
    ProcessSignInPage,
    ProcessSignUpPage,
    ProcessSignOutPage
};
