const Staff = require('../models/Staff');
const { StatusCodes } = require('http-status-codes');
const passport = require('passport');

const ProcessSignInPage = (req, res) =>
{
    passport.authenticate('local', function(err, user, info)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        if(!user)
        {
            return res.json({success: false, message: 'ERROR: Authentication Failed'});
        }

        req.logIn(user, function(err)
        {
            if(err)
            {
                console.error(err);
                res.end(err);
            }

            const authToken = GenerateToken(user);

            return res.json({success: true, message: 'Staff Logged In Successfully', staff:
                {
                    id: staff._id,
                    firstname: staff.firstname,
                    lastname: staff.lastname,
                    username: staff.username
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
    console.log(newStaff)
    Staff.register(newStaff, req.body.password, function(err)
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
            console.error(err);
            res.end(err);
        }

        console.log('User Logged Out');
    });

   res.json({success: true, message: "User Logged Out Successfully!"});
}

const getAllStaffs = async (req, res) => {
  const staffs = await Staff.find({});
  res
    .status(StatusCodes.OK)
    .json({ success: true, staffs: staffs, count: staffs.length });
};

module.exports = {
    ProcessSignInPage,
    ProcessSignUpPage,
    ProcessSignOutPage,
    getAllStaffs
};
