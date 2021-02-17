export default async function isAuthenticated(req, res, next) { 
  if(req.session.user) next();
  else res.status(401).json({message: "Please login!" });
}