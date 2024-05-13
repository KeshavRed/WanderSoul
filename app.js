if(process.env.NODE_ENV !== "production"){
    require('dotenv').config(); // Load environment variables from .env file in development
}

const express=require('express');
const path = require('path');
const mongoose=require('mongoose');
const Joi=require('joi'); // Validation library
const{campgroundSchema, reviewSchema}=require('./schemas.js'); // Joi schemas for validation
const ejsMate=require('ejs-mate'); // EJS template engine with additional features
const method_override=require('method-override'); // Middleware for HTTP method override
const flash=require('connect-flash'); // Middleware for flash messages
const catchAsync=require('./utils/catchAsync'); // Utility function for handling async functions
const ExpressError=require('./utils/ExpressError'); // Custom error class
const passport=require('passport'); // Authentication middleware for Node.js
const LocalStrategy=require('passport-local').Strategy; // Strategy for authenticating with a username and password
const User=require('./models/user'); // User model
const Campground=require('./models/campground'); // Campground model
const Review=require('./models/review'); // Review model
const session=require('express-session'); // Middleware for managing sessions
const mongoSanitize = require('express-mongo-sanitize'); // Middleware to prevent MongoDB Operator Injection
const helmet = require('helmet'); // Middleware for HTTP security headers

const Userroutes=require('./routes/users'); // User routes
const campground=require('./routes/campgrounds'); // Campground routes
const review=require('./routes/reviews'); // Review routes

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const db=mongoose.connection; 
db.on("error", console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("Database connection");
});

const app=express(); // Create express application

app.engine('ejs',ejsMate); // Set EJS as the view engine with ejs-mate
app.set('view engine','ejs'); // Set the view engine to EJS
app.set('views',path.join(__dirname,'views')); // Set the views directory

app.use(express.urlencoded({extended:true})); // Parse URL-encoded bodies
app.use(method_override('_method')); // Enable HTTP method override
app.use(express.static(path.join(__dirname,'public'))); // Serve static files from the 'public' directory
app.use(mongoSanitize({ replaceWith: '_' })); // Prevent MongoDB Operator Injection

// Session configuration
const sessionConfig={
    name: 'session',
    secret : 'thisisagoodsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.get('/' , (req,res)=>{
    res.render('home', { currentUser: req.user });

}) 

app.use(session(sessionConfig)); // Use session middleware
app.use(flash()); // Use flash middleware for flash messages

// Passport configuration
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Use passport session for persistent login sessions
passport.use(new LocalStrategy(User.authenticate())); // Use LocalStrategy for local authentication
passport.serializeUser(User.serializeUser()); // Serialize user
passport.deserializeUser(User.deserializeUser()); // Deserialize user

// Middleware to add currentUser, success, and error variables to all views
app.use((req, res, next) => {
    res.locals.currentUser = req.user; // Set currentUser to the current user
    res.locals.success = req.flash('success'); // Set success flash messages
    res.locals.error = req.flash('error'); // Set error flash messages
    next();
});

// Mount routes
app.use('/',Userroutes); // Use Userroutes for user-related routes
app.use('/campground',campground); // Use campground routes for campground-related routes
app.use('/campground/:id/reviews',review); // Use review routes for review-related routes

// 404 error handler
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

// Error handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
});

// Start server
app.listen(3013, () => {
    console.log("serving on port 3007");
});
