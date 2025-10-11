const adminAuth = (req, res, next) => {
  console.log("user auth is checked");
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};
module.exports = { adminAuth };
