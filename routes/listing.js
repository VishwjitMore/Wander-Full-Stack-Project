const express = require("express");
const router=express.Router();
const Listing = require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const  {isLoggedIn}= require("../middlewares");
const  {isOwner}= require("../middlewares");
const listingControllers=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});


//index route...
router.get("/", wrapAsync(listingControllers.index));

//create new listing....
router.get("/new",isLoggedIn,listingControllers.new);

router.post("/",isLoggedIn,upload.single("listing[image]"),wrapAsync(listingControllers.newPost));

// to search the listings
router.get("/search",wrapAsync(listingControllers.search));

//read/show route....
router.get("/:id", wrapAsync(listingControllers.show));

// edit the listing....
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingControllers.edit));

//update route....
router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),wrapAsync(listingControllers.update));

//delete the route...
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingControllers.destroy));

module.exports=router;