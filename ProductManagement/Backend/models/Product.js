const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
   
  name : {
    type : String,
    required : true
  },
  price : {
    type : Number,
    required : true
  },
  description : {
    type : String
  },
  category : {
    type : String
  }

})

module.exports = mongoose.model("Product" , productSchema) 