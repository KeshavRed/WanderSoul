const Review=require('../models/review');
const Campground=require('../models/campground');
module.exports.createReview=async(req,res)=>{
    const campground=await Campground.findById(req.params.id);// find the campground
    const review=new Review(req.body.review);
    review.author=req.user._id;
    campground.reviews.push(review);//pushing the reviewws into array
    await review.save();
    await campground.save();
    req.flash('success',"Your Review added");
    res.redirect(`/campground/${campground._id}`);
 }

 module.exports.deleteReview=async(req,res)=>{
    const {id,reviewId}=req.params;
    await Campground.findByIdAndUpdate(id , { $pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success',"Deleted the review");
    res.redirect(`/campground/${id}`);
}
