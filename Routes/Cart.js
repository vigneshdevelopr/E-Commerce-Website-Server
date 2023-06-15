import express from "express";
import { VerifyTokenandAuthorization, verifyToken, verifyTokenAndAdmin } from "./VerifyToken.js";
import { Cart } from "../Models/Cart.js";

const router = express.Router();
//Endpoints:

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const saveCart = await newCart.save();
    return res.status(200).json(saveCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//update the Cart

router.put("/:id", VerifyTokenandAuthorization, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updateCart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message + "Error found" });
  }
});

//Delete Cart:

router.delete("/:id", VerifyTokenandAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json("Hey Cart Has Been Deleted");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//GET Cart Details
router.get("/find/:userId", VerifyTokenandAuthorization, async (req, res) => {
  try {
    const Cart = await Cart.findOne({ userId: req.params.userId });
    return res.status(200).json(Cart);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get all the Cart :

router.get("/", verifyTokenAndAdmin ,async(req, res) => {
  try {
const AllCart = await Cart.find();
return res.status(200).json(AllCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export const CartRouter = router;
