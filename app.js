if(process.env.NODE_ENV!=="production"){
    require('dotenv').config();
}

const express=require('express');
const path = require('path');
const mongoose=require('mongoose');
const Joi=require('joi');
const{campgroundSchema , reviewSchema}=require('./schemas.js');
const ejsMate=require('ejs-mate');
const method_override=require('method-override');
const flash=require('connect-flash');
const catchAsync=require('./utils/catchAsync');
const ExpressError=require('./utils/ExpressError');
const passport=require('passport');
const LocalStrategy=require('passport-local');

const User=require('./models/user');
const Campground=require('./models/campground');
const exp = require('constants');
const Review=require('./models/review');
const session=require('express-session');


const Userroutes=require('./routes/users');
const campground=require('./routes/campgrounds');
const review=require('./routes/reviews');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    // // useCreateIndex:true,
    useUnifiedTopology:true,
});

const db=mongoose.connection; 
db.on("error", console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("Database connection");
});
const app=express();

app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(method_override('_method'));
app.use(express.static(path.join(__dirname,'public')));





app.get('/' , (req,res)=>{
    res.render('home', { currentUser: req.user });

})


const sessionConfig={
    secret : 'thisisagoodsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/',Userroutes);
app.use('/campground',campground)
app.use('/campground/:id/reviews',review)




// Define routes and middleware...

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})


app.listen(3013, () => {
    console.log("serving on port 3007");
});
