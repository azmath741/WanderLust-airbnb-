const Listing = require("./models/listing")
const Review= require("./models/review")
const expressError = require('./utils/expressError');
const { listingSchema,reviewSchema } = require('./schema.js');
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must have to login");
     return res.redirect("/login");
  }
  next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async(req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "Your Not The Owner Of This Listing")
    return res.redirect(`/listings/${id}`);
  }
  next();
}
module.exports.isReviewAuthor = async(req, res, next) => {
  let {id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "Your Not The Author Of This Review")
    return res.redirect(`/allListings/${id}`);
  }
  next();
}
// listingSchema validation middleware
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new expressError(error.details.map(el => el.message).join(','), 400)
  } else {
    next();
  }
};
// reviewSchema validation middleware
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new expressError(error.details.map(el => el.message).join(','), 400)
  } else {
    next();
  }
};