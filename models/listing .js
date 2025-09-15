const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String,required: true },
  description: String,
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1755963216439-bd77f9690868?q=80&w=627&auto=format&fit=crop"
  },
  price: {
  type: Number,min:0} ,
  location: String,
  country: String,
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;