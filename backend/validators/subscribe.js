const { check } = require('express-validator');

exports.subscribeValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Valid email is required.'),
];