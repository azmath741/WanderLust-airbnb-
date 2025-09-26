const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const expressError = require('./utils/expressError');
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
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
const dbUrl = process.env.ATLASDB_URL;
main()
  .then(()=> console.log('Connected to db'))
  .catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
  await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret:process.env.SECRET
  },
  touchAfter:24*3600,
});
store.on("error", (err) => {
  console.log("error in mongo store",err);
});
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookoies: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly:true
  }
}

//  route's
// app.get('/', (req, res) => {
//   res.send('this is a root route');
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// flash middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});
//routes
app.use("/allListings", listingRouter);
app.use("/allListings/:id/reviews", reviewRouter);
app.use("/", userRouter);

//page not found middleware
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