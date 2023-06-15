import express from "express";
import {
  VerifyTokenandAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} from "./VerifyToken.js";
import bcrypt from "bcrypt";
import { User } from "../Models/User.js";

const router = express.Router();
//Endpoints:

// router.get('/all', async(req, res)=>{
//     const alluser = await User.find()
//     return res.status(200).json(alluser)
// })

router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message + "Error found" });
  }
});

//Delete User:

router.delete("/:id", VerifyTokenandAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("Hey User Has Been Deleted");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Get User:

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit("5")
      : await User.find();
    // const { password, ...others } = users._doc;
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  console.log(lastYear);

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }

  return res.status(200).send(date);
});

export const UserRouter = router;
