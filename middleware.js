const{campgroundSchema , reviewSchema}=require('./schemas.js');
const ExpressError=require('./utils/ExpressError.js');
const Campground=require('./models/campground');
const Review=require('./models/review');

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl; //uses returnto property in sessions to redirect  
        req.flash('error','You must be signed in');
        return res.redirect('/login');
    }
    next();// next is to execute next middleware in the stack
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}// the above function helps to store the requested url in the session and then redirect to the requested url after login



module.exports.validateCampground = (req,res,next)=>{
    
    const {error}=campgroundSchema.validate(req.body);//.validate is from mongoose where hoe to validate is a method of joi
    if(error){
        const msg=error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,400)
    }
    else{
        next();
    }
}

module.exports.isAuthor= async(req,res,next)=>{
    const {id}=req.params;
    const campground=await Campground.findById(id);
    if (!campground.author.equals(req.user._id)){// to check if its user or not 
        req.flash('error','you dont have the permission');
        return res.redirect(`/campground/${campground._id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    console.log(review)
    
    // Check if review is null or undefined
    if (!review || !review.author || !review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have the permission');
        return res.redirect(`/campground/${id}`);
    }
    
    next();
};


module.exports.validateReview = (req,res,next)=>{
    
    const {error}=reviewSchema.validate(req.body);
    if(error){
        const msg=error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,400)
    }
    else{
        next();
    }
}