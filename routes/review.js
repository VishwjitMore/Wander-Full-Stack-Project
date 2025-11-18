const express = require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn,isReviewAuthor } = require("../middlewares.js");
const reviewControllers=require("../controllers/reviews.js")

//reviews..........
//post route for reviews
router.post("/",isLoggedIn, wrapAsync(reviewControllers.createReview));

//delete route for reviews
router.delete("/:reviewId",isLoggedIn, isReviewAuthor,wrapAsync(reviewControllers.destroyReview));

module.exports=router;
