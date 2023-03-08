const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 32,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    }
}, 
{timestamp: true}
);



module.exports = mongoose.model('Tag', tagSchema);