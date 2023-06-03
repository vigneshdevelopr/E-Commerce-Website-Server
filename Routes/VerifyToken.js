import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.secretkey, (err, user) => {
      if (err) return res.status(403).json("Your Token is invalid!");
      req.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ message: "You are not authorized to access this website" });
  }
};

export const VerifyTokenandAuthorization = (req, res, next) => {
  try {
    if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Hey! You are not allowed to access this Page" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message + "Error occurred" });
  }
};

//================================================================

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
