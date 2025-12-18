const express = require('express');
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Product = require('./models/products')
const Farm = require("./models/farm");   
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));   
app.use(express.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
mongoose.connect("mongodb://localhost:27017/farmDB")
  .then(() => {
    console.log("Connected to farmDB");
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });

app.get('/farms/thisfarm/:id', async (req, res)=>
{    const farm  = await Farm.findById(req.params.id).populate('products');   // 👈 THIS LINE IS REQUIRED

     res.render('farms/show.ejs', { farm });
});

app.get('/farm/:id/products/new', async(req, res)=>
{
  const { id } = req.params;
  res.render('farms/addproduct.ejs', { id } );

});

app.get('/products/all', async (req, res) =>
{
  const products =await Product.find({});
    res.render('products/products.ejs', { products });
});
  app.get("/farm/new", (req, res)=>
  {
    res.render('farms/new.ejs');
  } );
   
  app.delete('/farms/:id', async (req , res) =>
{
   const farm = await Farm.findByIdAndDelete(req.params.id); 
   res.redirect("/farms");
});

    app.get("/farms", async (req, res)=>
  {
     const farms = await Farm.find({});
     res.render('farms/index.ejs', { farms });
  } );

  app.post("/farms", async (req, res)=>
  {
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect('/farms');
  });

    app.post("/farm/:id/product", async (req, res)=>
  {
    const { id } = req.params;
    const farm = await Farm.findById(id);
     const product  = new Product(req.body);
     product.farm = farm;
     farm.products.push(product);
     await farm.save();
     await product.save();
     res.redirect('/farms');

  
  });

app.listen(4000, () => {
  console.log(`Server running on port 4000`);
});