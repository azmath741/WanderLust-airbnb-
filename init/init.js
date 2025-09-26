const mongoose = require('mongoose');
const Listing = require('../models/listing.js');
const initData= require('./data.js');
//setting up mongoose and connecting to db
main()
  .then(()=> console.log('Connected to db'))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner:"68cfc6ce9379ce80306d1bd7"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();