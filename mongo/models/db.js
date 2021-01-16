const mongoose = require('mongoose');


 mongoose.connect("mongodb://localhost:27017/RestoDB",
  { useNewUrlParser: true , useUnifiedTopology: true })
  .then(()=>console.log("connection stablished!")).catch((err)=>console.log(err));


  require('./user.model');