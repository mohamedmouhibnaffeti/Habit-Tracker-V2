const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
  try{
    const token = req.header("Authorization").split(" ")[1]
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    try {
      const decodedToken = jwt.verify(token, "mohamed mouhib naffeti secret");
      req.user = decodedToken.id; // Store the decoded token in the request object
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token." });
    }
  }catch(err){
    res.send("No authorization header provided")
  }
}

module.exports = authenticateUser