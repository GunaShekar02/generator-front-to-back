import * as jwt from "jsonwebtoken";

// eslint-disable-next-line no-unused-vars, no-shadow
export default async function isAuthenticated(req, res, next) {
  let token = req.headers.authorization;
  if (!token) res.status(401).json({ message: "Token missing" });
  else {
    try {
      token = token.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: err.message || "Invalid Token" });
    }
  }
}