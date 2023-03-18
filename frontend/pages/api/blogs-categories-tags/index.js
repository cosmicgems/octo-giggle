import Blog from '../../../../backend/models/blog'
import formidable from 'formidable';
const slugify = require('slugify')
import _ from 'lodash';
import Category from '../../../../backend/models/category';
import Tag from '../../../../backend/models/tag';
import { errorHandler } from '../../../../backend/helpers/dbErrorHandler';
const fs = require('fs')
import { smartTrim } from '../../../../backend/helpers/blog';
const { errorMonitor } = require('events')
// const User = require('../models/user')


export default function listAllBlogsCategoriesTags(req, res) {
    let limit = req.body.limit ? parseInt(req.body.limit) : 5
    let skip = req.body.skip ? parseInt(req.body.skip) : 0
    let blogs;
    let categories;
    let tags;
    Blog.find({})
    .populate('categories', '_id name slug photo' )
    .populate('tags', '_id name slug' )
    .populate('postedBy', '_id name profile username' )
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit)
    .select('_id title slug excerpt excerptmobile  categories tags postedBy createdAt updatedAt')
    .exec((err, data) => {
        if(err) {
            return res.json({
                error: errorHandler(err)
            });
        };
        blogs = data;
        
        Category.find({}).exec((err, c) => {
            if(err) {
                return res.json({
                error: errorHandler(err)
            });
            }
            categories = c;
            Tag.find({}).exec((err, t) => {
                if(err) {
                    return res.json({
                        error: errorHandler(err)
                    })
                }
                tags = t;
                res.json({blogs, categories, tags, size: blogs.length});
            })
        })
        })
};