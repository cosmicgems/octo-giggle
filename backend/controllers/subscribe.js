const Subscriber = require('../models/subscriber')
const { errorHandler } = require('../helpers/dbErrorHandler')
const slugify = require('slugify')

exports.subscribe = (req, res) => {
    const {name, email} = req.body;
    let slug = slugify(name).toLowerCase()
    let subscriber = new Subscriber({name, slug, email})

    subscriber.save((err, data) => {
        if(err) {
            console.log(err);
            return res.status(400).json({
                
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}
