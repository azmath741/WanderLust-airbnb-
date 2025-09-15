const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Listing = require('./models/listing ');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync');
const expressError = require('./utils/expressError');
const { listingSchema } = require('./schema.js');
const path=require('path');
const app = express();
const port = 8080;
// setting up ejs and views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
//setting up mongoose and connecting to db
main()
  .then(()=> console.log('Connected to db'))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

//validation middleware
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new expressError(error.details.map(el => el.message).join(','), 400);
  } else {
    next();
  }
};
//delete route
app.delete("/allListings/:id",wrapAsync( async (req, res) => {
  let id = req.params.id;
  await Listing.findByIdAndDelete(id);//deleting from database
  res.redirect('/allListings');
}));
//update route
app.patch("/allListings/:id",wrapAsync( async (req, res) => {
  let id = req.params.id;
  await Listing.findByIdAndUpdate(id, req.body.listing,{ new: true, runValidators: true });//updating in database
  res.redirect('/allListings/' + id);
}));
//edit route
app.get('/allListings/:id/edit', wrapAsync(async (req, res) => {
  let id = req.params.id;
  let listing = await Listing.findById(id);//finding in database
  res.render('./listings/edit.ejs', { listing });
}));
//new list create route
app.post('/allListings', wrapAsync(async (req, res) => {
  if(!req.body.listing) throw new expressError('Invalid Listing Data', 400);
  const newListing = new Listing(req.body.listing);//inserting in database
  await newListing.save();
  res.redirect('/allListings');
}));

//new route
app.get('/allListings/new', (req, res) => {
  res.render('./listings/new.ejs');
});
//show route
app.get('/allListings/:id', wrapAsync(async (require, res) => {
  let  id  = require.params.id;
  let listing = await Listing.findById(id);//finding in database
  res.render('./listings/show.ejs', { listing });
}));
//index route
app.get('/allListings', wrapAsync(async (req, res) => {
  let listings = await Listing.find({});
  res.render('./listings/index.ejs', { listings });
}));
//  route's
app.get('/', (req, res) => {
  res.render('./listings/home.ejs');
});

app.use((req, res, next) => {
  next(new expressError('Page not found', 404));
});

//error handling middleware
app.use((err, req, res, next) => {
  const { message = "something went wrong", status = 500 } = err;
  res.status(status).render('./listings/error.ejs',{message,status});
});


// listening on port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});