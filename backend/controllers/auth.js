const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const {expressjwt} = require('express-jwt')
const { errorHandler } = require('../helpers/dbErrorHandler')
const Blog = require('../models/blog')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const _ = require('lodash')
const {OAuth2Client} = require('google-auth-library');

exports.preSignup =(req, res) => {
    const {name, email, password} = req.body;
    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(user) {
            return res.status(400).json({
                error: 'Email is taken.'
            })
        }
        const token = jwt.sign({name, email, password}, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m'});

        // email
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Account Activation Link`,
            html: `
            <p>Please use the following link to activate your account:</p>
            <p>${process.env.CLIENT_URL}/auth/account/activate/${token}</p>
            <hr />
            <p>This email may contain sensitive information.</p>
            <p>https://seoblog.com</p>
        `
        };

        sgMail.send(emailData).then(sent => {
            return res.json({
                message: `Email has been sent to ${email}. Follow the instructions to activate your account.`
            })
        })
    });
};

// exports.signup = (req, res) => {
//    User.findOne({email: req.body.email}).exec((err, user) =>{
//         if(user) {
//             return res.status(400).json({
//                 error: 'Email is taken.'
//             })
//         }

//         const {name, email, password} = req.body;
//         let username = shortId.generate();
//         let profile = `${process.env.CLIENT_URL}/profile/${username}`;

//         let newUser = new User({name, email, password, profile, username})
//         newUser.save((err, success) =>{
//             if(err){
//                 return res.status(400).json({
//                     error: 'Could not signup user.'
//                 })
//             }
//             // res.json({
//             //     user: success
//             // })
//             res.json({
//                 message: 'Signup success! Please signin.'
//             })
//         })
//    })
// }

exports.signup = (req, res) => {
    const token = req.body.token;
    if(token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
            if(err) {
                return res.status(401).json({
                    error: 'Expired link. Please try signing up again'
                })
            }
            const {name, email, password} =jwt.decode(token);

            let username = shortId.generate();
            let profile = `${process.env.CLIENT_URL}/profile/${username}`;

            const user = new User({name, email, password, profile, username});

            user.save((err, user) => {
                if(err) {
                    return res.status(401).json({
                        error: 'Expired link. Signup again.'
                    })
                }
                return res.json({
                    message: 'Signup success! Please signin.'
                })
            });


        } )
    } else {
        return res.json({
            message: 'Something went wrong. Please try again.'
        })
    };
};

exports.signin = (req, res) => {
    const {email, password} = req.body
    //check if user exist
    User.findOne({email}).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup.'
            });
        }
    //authenticate
    if(!user.authenticate(password)){
        return res.status(400).json({
            error: 'Email and password do not match.'
        });
    }

    //generate a token and send to client
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d'});

    res.cookie('token', token, {expiresIn:'1d'})
    const {id, username, name, email, role} = user;
    return res.json({
        token,
        user: {id, username, name, email, role}
    });
    });
};

exports.signout = (req, res) => {
    res.clearCookie('token')
    res.json({
        message: 'Signout success'
    });
};

exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "JWT",
});
exports.authMiddleware = (req, res, next) => {
    const authUserId = req.auth._id;
    User.findById({ _id: authUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

exports.adminMiddleware = (req, res, next) => {
    const adminUserId = req.auth._id;
    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.role !== 1) {
            return res.status(400).json({
                error: 'Admin resource. Access denied'
            });
        }

        req.profile = user;
        next();
    });
};

exports.canUpdateDeleteBlog = (req, res, next) => {
    const slug = req.params.slug.toLowerCase()
    Blog.findOne({slug}).exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        let authorizedUser = data.postedBy._id.toString() === req.profile._id.toString()
        if(!authorizedUser) {
            
            return res.status(400).json({
                error: 'You are not authorized.'
            });
        }
        next();
    })
}
exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: 'User with that email does not exist'
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' });

        // email
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Password reset link`,
            html: `
            <p>Please use the following link to reset your password:</p>
            <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://seoblog.com</p>
        `
        };
        // populating the db > user > resetPasswordLink
        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.json({ error: errorHandler(err) });
            } else {
                sgMail.send(emailData).then(sent => {
                    return res.json({
                        message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10min.`
                    });
                });
            }
        });
    });
};

exports.resetPassword =  (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;
    console.log(resetPasswordLink);

    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    error: 'Expired link. Try again'
                })
            }
            const query = User.where({ resetPasswordLink: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0ZjJlZDcyMzc4YWQ5MDYxMThjOTgiLCJpYXQiOjE2NzkxMDM3MTUsImV4cCI6MTY3OTEwNDMxNX0.6VL4wtWbeKmoDgnuTiHIVbRPRejDrXYCHwXCMNf--0Y"});
            const userfound =  query.findOne();
            console.log(userfound);
            User.findOne({resetPasswordLink: resetPasswordLink}).exec((err, user)=>{
                if (err ) {
                    return res.status(401).json({
                        error: 'Something went wrong. Try later'
                    });
                };
                
                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                };

                user = _.extend(user, updatedFields)


                return user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    }
                    res.json({
                        message: `Great! Now you can login with your new password`
                    });
                });
            });

            });
        
    }
};


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
exports.googleLogin = (req, res) => {
    const idToken = req.body.tokenId;
    client.verifyIdToken({idToken, audience: process.env.GOOGLE_CLIENT_ID}).then(response => {
        const {email_verified, name, email, jti} = response.getPayload;
        if(email_verified) {
            User.findOne({email}).exec((err, user) => {
                if(user) {
                    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
                    res.cookie('token', token, {expiresIn: '1d'});
                    const {_id, email, name, role, username} = user;
                    return res.json({token, user: {_id, email, name, role, username}});
                } else {
                    let username = shortid.generate();
                    let profile = `${process.env.CLIENT_URL}/profile/${username}`;
                    let password = jti + `${process.env.JWT_SECRET}`;
                    user = new User({name, email, profile, username, password});
                    user.save((err, data) => {
                        if(err) {
                            return res.status(400).json({
                                error: errorHandler(err)
                            })
                        }
                        const token = jwt.sign({_id: data._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
                        res.cookie('token', token, {expiresIn: '1d'});
                        const {_id, email, name, role, username} = data;
                        return res.json({token, user: {_id, email, name, role, username}});
                    });
                }
            });
        } else {
            if(err) {
                return res.status(400).json({
                    error: 'Google login failed. Try again.'
                });
            }
        }
    });
};


exports.loginStatusCheck = (req, res) => {
    const userEmail = req.body.session.user.email;
   
        
        if(userEmail) {
            User.findOne({email}).exec((err, user) => {
                if(user) {
                    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
                    res.cookie('token', token, {expiresIn: '1d'});
                    const {_id, email, name, role, username} = user;
                    return res.json({token, user: {_id, email, name, role, username}});
                } else {
                    let username = shortid.generate();
                    let profile = `${process.env.CLIENT_URL}/profile/${username}`;
                    let password = jti + `${process.env.JWT_SECRET}`;
                    user = new User({name, email, profile, username, password});
                    user.save((err, data) => {
                        if(err) {
                            return res.status(400).json({
                                error: errorHandler(err)
                            })
                        }
                        const token = jwt.sign({_id: data._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
                        res.cookie('token', token, {expiresIn: '1d'});
                        const {_id, email, name, role, username} = data;
                        return res.json({token, user: {_id, email, name, role, username}});
                    });
                }
            });
        } else {
            if(err) {
                return res.status(400).json({
                    error: 'Google login failed. Try again.'
                });
            }
        }
};