import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: "Boolean",
      default: false,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
//token:

// const genToken = (id) => {
//   return jwt.sign({ id },{isAdmin}, process.env.secretkey);
// };

export { User };
