
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
 require('dotenv').config()


 //app

const app = express();
//cors
 if(process.env.NODE_ENV === 'development') {
    app.use(cors({origin: `${process.env.CLIENT_URL}`}));
 }
 //db
mongoose.connect(process.env.DATABASE).then(() => console.log("DB connected")).catch((err) => console.log("DB Error => ", err));

 //middleware
 app.use(morgan('dev'))
 app.use(bodyParser.json())
 app.use(cookieParser())
 
 //note
 const blogRoutes = require('./routes/blog')
 const authRoutes = require('./routes/auth')
 const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag');
const formRoutes = require('./routes/form');
const subscribeRoutes = require('./routes/subscribe');

 //routes middleware
 app.use('/api', blogRoutes);
 app.use('/api', authRoutes);
 app.use('/api', userRoutes);
 app.use('/api', categoryRoutes);
 app.use('/api', tagRoutes);
 app.use('/api', formRoutes);
 app.use('/api', subscribeRoutes);


 //port
 const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on ${port}.`);
})