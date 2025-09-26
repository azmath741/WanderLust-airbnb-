const Listing = require('../models/listing.js');
const expressError = require('../utils/expressError');

module.exports.index = async (req, res) => {
  //   let listings = await Listing.find({});
  //   res.render('./listings/index.ejs', { listings });
  // };
  let{ q }= req.query;
  let listings;
  if (q) {
    listings = await Listing.find({country: { $regex: q, $options: "i" }});
  } else {
    listings = await Listing.find({});
  }
  res.render("./listings/index.ejs", { listings });
}

module.exports.renderNewForm = (req, res) => {
  res.render('./listings/new.ejs');
};

module.exports.showListing = async (req, res) => {
  let id = req.params.id;
  let listing = await Listing.findById(id).populate({
    path: "reviews", populate: {
      path: "author"
    }
  }).populate("owner");//finding in database
  if (!listing) {
    req.flash("error", "Listing You Requested For Does Not Exist");
    return res.redirect("/allListings");
  }
  res.render('./listings/show.ejs', { listing });
};

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);//inserting in database
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created");
  res.redirect('/allListings');
};

module.exports.updateListing = async (req, res) => {
  let id = req.params.id;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });//updating in database
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated");
  res.redirect('/allListings/' + id);
};

module.exports.editListing = async (req, res) => {
  let id = req.params.id;
  let listing = await Listing.findById(id);//finding in database
  if (!listing) {
    req.flash("error", "Listing You Requested For Does Not Exist");
    return res.redirect("/allListings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render('./listings/edit.ejs', { listing, originalImageUrl});
};

module.exports.destroyListing = async (req, res) => {
  let id = req.params.id;
  await Listing.findByIdAndDelete(id);//deleting from database
  req.flash("success", "Listing Deleted");
  res.redirect('/allListings');
};