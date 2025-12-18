const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"], // custom message
    trim: true
  },
  price: {
    type: Number
  },
  type: {
    type: String,
    enum: ["fruit", "vegetable", "other"],
    default: "other",
    
  },
  farm:{type:Schema.Types.ObjectId, ref:'Farm'}
});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;

