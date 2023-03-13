const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        min: 3,
        max: 160,
        index: true,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    body: {
        type: {},
        trim: true,
        required: true,
        min: 200,
        max: 2000000,
    },
    excerpt: {
        type: String, 
        required: false,
        max: 1000
    },
    excerptmobile: {
        type: String, 
        required: false,
        max: 1000
    },
    mtitle: {
        type: String,
    },
    mdesc: {
        type: {},
        
    },
    about: {
        type: String
    }, 
    photo: {
        data: Buffer,
        contentType: String
    },
    categories: [{type: ObjectId, ref: 'Category', required: true}],
    tags: [{type: ObjectId, ref: 'Tag', required: true}],
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }
}, {timestamps: true})


module.exports = mongoose.model('Blog', blogSchema);