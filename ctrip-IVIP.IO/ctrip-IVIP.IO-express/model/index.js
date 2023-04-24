let mongoose = require('mongoose')
let HotelSchema = require ("./hotelmodel")
let orderSchema = require ("./ordermodel")
let userSchema = require ("./usermodel")
let commentSchema = require("./commentmodel")

async function main() {
  await mongoose.connect("mongodb://127.0.0.1/hotels");
}

main()
  .then((res) => {
    console.log("mongo connected success");
  })
  .catch(() => {
    console.log("mongo connected fail");
  });

const Hotel = mongoose.model("Hotelmsg", HotelSchema);
const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);
const Comment = mongoose.model("Comment", commentSchema);


module.exports =  { Hotel, Order, User ,Comment};//packageOptions