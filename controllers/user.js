const User = require("../models/user.js");

module.exports.renderSignup = (req, res) => {
  res.render("./users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    let user = new User({ email, username });
    let userRegistered = await User.register(user, password);
    req.login(userRegistered, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to WanderLust");
      res.redirect("/allListings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("./users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome Back To WanderLust");
  let redirectUrl = res.locals.redirectUrl || "/allListings";
  res.redirect(redirectUrl);
};

module.exports.logOut = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err)
    }
    req.flash("success", "Logged You Out");
    res.redirect("/allListings")
  });
};