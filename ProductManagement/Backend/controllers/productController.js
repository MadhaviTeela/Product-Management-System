const Product = require('../models/Product')

// Get all Products
const getProducts = async (req , res) => {
   
  try{
    const products = await Product.find();
    res.status(200).json(products)
  }
  catch(error){
    console.log(error)
    res.status(500).json({message : "Server error"});
  }
}

// Add a new Product
const addProduct = async (req , res) => {

  try{
    const { name , price , description , category } = req.body;

    if(!name || !price){
      return res.status(400).json({message : "Name and Price are required!"})
    }

    const newProduct = new Product (
        { name , price , description , category }
    );

    await newProduct.save();
    res.status(201).json(newProduct);

  }
  catch(error){
    console.log(error)
    res.status(400).json({message : "Invalid Product data"})
  }

}

const deleteProduct = async (req , res) => {
    
  try{
      const product = await Product.findByIdAndDelete(req.params.id);
      if(!product){
          return res.status(404).json({message : "Product not found"})
      }
      res.status(200).json({message : "Product deleted"})
  }
  catch(error){
    console.log(error)
    res.status(500).json({message : "Server error"})
  }


}

const updateProduct = async (req , res) => {

  try {
       const { name , price , description , category } = req.body

       const fieldsToUpdate = {};
       if(name !== undefined) fieldsToUpdate.name = name;
       if(price !== undefined) fieldsToUpdate.price = price;
       if(description !== undefined) fieldsToUpdate.description = description;
       if(category !== undefined) fieldsToUpdate.category = category;

       if(Object.keys(fieldsToUpdate).length === 0){
         return res.status(400).json({message : "No fileds provided for data Updation"});
       }


      

       const updatedProduct = await Product.findByIdAndUpdate(req.params.id ,
                                                          fieldsToUpdate,
                                                         {new : true , runValidators : true});
       if(!updatedProduct){
          return res.status(404).json({message : "Product not found"})
       }
       res.status(200).json(updatedProduct);
  }
  catch(error){
    console.log(error)
    res.status(500).json({message : "Server error"});
  }
  
  
}

// Get single Product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProducts, addProduct, deleteProduct, updateProduct, getProductById };


// module.exports = {getProducts , addProduct , deleteProduct , updateProduct}




