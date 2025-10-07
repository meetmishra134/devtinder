const express = require("express");
const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello From Meet");
});
app.use("/test", (req, res) => {
  res.send("This is the test file");
});
app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
