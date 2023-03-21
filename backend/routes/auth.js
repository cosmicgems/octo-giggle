const express = require('express')
const router = express.Router()
const {signup, preSignup, signin, signout, requireSignin, forgotPassword, resetPassword, googleLogin, loginStatusCheck} = require('../controllers/auth');

//validators
const {runValidation} = require('../validators')
const {userSignupValidator, userSigninValidator, forgetPasswordValidator, resetPasswordValidator} = require('../validators/auth')

router.post('/pre-signup', userSignupValidator, runValidation, preSignup)
router.post('/signup',  signup)
router.post('/signin', userSigninValidator, runValidation, signin)
router.get('/signout', signout);
router.put('/forgot-password', forgetPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);
router.post('/google-login', googleLogin);
router.post('/google-login-verify', loginStatusCheck);
//test
// router.get('/secret', requireSignin, (req, res) => {
//     res.json({
//         user: req.auth
//     });
// });

module.exports = router;