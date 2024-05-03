// ** Express setup : *****
const express = require('express');
const app = express();

const session = require('express-session');

app.use(express.urlencoded({ extended: true }));// To parse the form data
app.use(express.json());// To parse the JSON data

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');

//--------------------------------------------

// ** Geting our mongoose model set up : *****
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/venturevista', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});
//------------------------------------------------


// ** Requiring modules : *****
const Campground = require('./models/campground');
const Review = require('./models/review');
//------------------------------------------------


//Setting up ejs and views directory
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));// To serve the public directory
//------------------------------------------------

// ** Setting up Routes : *****
app.get('/', (req, res) => {
    res.render('home/index')
});

const campgrounds = require('./routes/campgrounds');
app.use('/', campgrounds);

const reviews = require('./routes/reviews');
app.use('/campgrounds/:id/reviews', reviews);


const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}   
app.use(session(sessionConfig));


// ** Error Handling : *****
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});


app.use((err, req, res, next) => {
    const { statusCode = 500} = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(statusCode).render('errors', { err });
});

//------------------------------------------------

// ** Starting the server : *****
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//------------------------------------------------

