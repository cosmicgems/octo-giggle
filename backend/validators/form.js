const { check } = require('express-validator');

exports.contactFormValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Valid email is required.'),
    check('message')
        .not()
        .isEmpty()
        .isLength({min: 20})
        .withMessage('The message must be at least 20 characters long.')
];