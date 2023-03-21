const mongoose = require('mongoose');
const crypto = require('crypto');

const subscriberSchema = new mongoose.Schema(
    {
       
        name: {
            type: String,
            trim: true,
            required: true,
            max: 50
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
        slug: {
            type: String,
            unique: true,
            index: true,
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model('Subscriber', subscriberSchema);