import express from "express";
import { verifyTokenAndAdmin } from "./VerifyToken.js";
import { Product } from "../Models/Product.js";

const router = express.Router();
//Endpoints:

//Post the Product:

router.post("/addProduct", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const saveProd = await newProduct.save();
    return res.status(200).json(saveProd);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//update the Product


router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateProd = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updateProd);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message + "Error found" });
  }
});


//Delete Product:

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json("Hey Product Has Been Deleted");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


//GET Product Details
router.get("/find/:id", async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    res.status(200).json(prod);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All Products
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
  let products;
   if(qNew){
    products = await Product.find().sort({createdAt: -1}).limit(1)
   }else if(qCategory){
    products = await Product.find({category:{
      $in: [qCategory],
    },

  })
   }else{
    products = await Product.find();
   }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

export const ProductRouter = router;
