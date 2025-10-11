const express = require("express");
const app = express();

// const { adminAuth } = require("./middlewares/auth");
// app.use(adminAuth);

// app.get("/admin/createUser", adminAuth, (req, res) => {
//   res.send("User created successfully");
// });
// app.get("admin/deleteUser", (req, res) => {
//   res.send("User deleted successfully");
// });
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("response 1");
//     next();
//     // res.send("response from user 1");
//   },
//   (req, res, next) => {
//     console.log("response 2");
//     // res.send("response from user 2");
//     next();
//   },
//   (req, res, next) => {
//     console.log("response 3");
//     // res.send("response from user 3");
//     next();
//   }
// );

// app.get("/user/:userId/:name", (req, res) => {
//   console.log(req.params);
//   res.send({ Name: "Meet", Age: 21, Gender: "Male" });
// });
// app.post("/user", (req, res) => {
//   res.send("Data has been added to database");
// });
// app.put("/user", (req, res) => {
//   res.send("Data has been updated in database");
// });
// app.delete("/user", (req, res) => {
//   res.send("Data has been deleted from database");
// });
// app.use("/hello", (req, res) => {
//   res.send("Hello From Meet");
// });
// app.use("/hello/2", (req, res) => {
//   res.send("Hello");
// });

// app.use("/test", (req, res) => {
//   res.send("This is the test file");
// });
// app.use("/", (req, res) => {
//   res.send("Hello Hello Hello");
// });
const { connectDb } = require("./config/database");
const { User } = require("./models/user");
app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Amit",
    lastName: "sharma",
    email: "amitsharma@example.com",
    password: "secure143",
    age: 25,
    gender: "Male",
  });
  await user.save();
  res.send("User added successfully");
});

connectDb()
  .then(() => {
    app.listen(7777, () => {
      console.log("Server is listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
