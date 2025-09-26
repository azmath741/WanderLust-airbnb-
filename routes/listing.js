if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer')
const {storage}=require("../cloudConfig")
const upload = multer({storage})

//index route
router.get('/', wrapAsync(listingController.index));

//new route
router.get('/new', isLoggedIn, listingController.renderNewForm);

//show route
router.get('/:id', wrapAsync(listingController.showListing));

//new list create route
router.post('/',isLoggedIn,upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing));

//update route
router.patch("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing));

//edit route
router.get('/:id/edit',isLoggedIn,isOwner, wrapAsync(listingController.editListing));

//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));
module.exports = router;