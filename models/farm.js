const mongoose = require("mongoose");
const { Schema } = mongoose;
const Product = require('./products');


const farmSchema = new Schema({
  name: {
    type: String,
    required: [true, "Farm name is required"],
    trim: true
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true
  },
  products:
  [
    {
      type:Schema.Types.ObjectId, ref:'Product'
    }
  ]
});

farmSchema.post('findOneAndDelete', async function (farm) {
  if (farm && farm.products.length) {
    await Product.deleteMany({
      _id: { $in: farm.products }
    });
  }
});
const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;