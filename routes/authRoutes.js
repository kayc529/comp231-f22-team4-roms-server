const express = require('express');
const router = express.Router();

const {
  ProcessSignInPage,
  ProcessSignUpPage,
  ProcessSignOutPage,
} = require('../controllers/authController');

router.post('/signin', ProcessSignInPage);
router.post('/signup', ProcessSignUpPage);
router.get('/signout', ProcessSignOutPage);

module.exports = router;
