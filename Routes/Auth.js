import express from "express";
import { User} from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const router = express.Router();


//Endpoints:
router.get("/users", async (req, res) => {
  const allUser = await User.find();

  return res.status(200).json({ allUser });
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const UserChk = await User.findOne({ email });

    if (UserChk) {
      return res.status(401).json({ message: "Account already registered" });
    } else {
      //hashing password :
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword);

      const NewUser = await new User({
        username,
        email,
        password: hashedPassword,
      }).save();
      console.log(NewUser);
      return res.status(200).send(NewUser);
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//Login:

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const ValidatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!ValidatePassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
const token = jwt.sign({
  id: user._id,
  isAdmin: user.isAdmin
},process.env.secretkey,{expiresIn: "48h"})

const { password, ...others } = user._doc;  

    console.log(token);
    return res.status(200).json({ message: "Login successful", token: token,...others });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export const AuthRouter = router;
