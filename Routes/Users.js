import express from 'express';
import {VerifyTokenandAuthorization, verifyToken, verifyTokenAndAdmin} from './VerifyToken.js';
import bcrypt from 'bcrypt';
import { User } from '../Models/User.js';

const router = express.Router();
//Endpoints:

router.get('/all', async(req, res)=>{
    const alluser = await User.find()
    return res.status(200).json(alluser)
})

router.put('/:id', verifyToken, async (req, res) => {
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

router.delete('/:id', VerifyTokenandAuthorization, async(req, res)=>{
  try {
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json('Hey User Has Been Deleted')
  } catch (error) {
  return res.status(500).json({message: error.message});  
  }
})

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



export const UserRouter = router;