import express from "express";
import { Orders } from "../Models/Orders.js";
import { verifyToken, verifyTokenAndAdmin } from "./VerifyToken.js";

const router = express.Router();
//Endpoints:
router.post("/add", verifyToken, async (req, res) => {
  const newOrders = new Orders(req.body);
  try {
    const saveOrders = await newOrders.save();
    return res.status(200).json(saveOrders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

//update the Orders

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateOrders = await Orders.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updateOrders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message + "Error found" });
  }
});

//Delete Orders:

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Orders.findByIdAndDelete(req.params.id);
    return res.status(200).json("Hey Orders Has Been Deleted");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//GET Orders Details
router.get("/find/:userId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Orders.find({ userId: req.params.userId });
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get all the Orders :

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const AllOrders = await Orders.find();
    return res.status(200).json(AllOrders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//get income:

router.get("/incomes", verifyToken, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Orders.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    console.log(income);
    return res.status(200).json(income);
  } catch (err) {
    return res.status(500).json(err);
  }
});

export const OrderRouter = router;
