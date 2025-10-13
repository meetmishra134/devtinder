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

app.use(express.json());

//Add a user to the database
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send("User added successfully");
  } catch (error) {
    res.status(500).send("Error adding user");
  }
});
//Get the user from the database by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.find({ email: userEmail });
    if (user.length === 0) {
      return res.status(404).send("User not found");
    } else {
      res.status(201).send(user);
    }
  } catch (error) {
    res.status(500).send("Error fetching user");
  }
});

//Get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(401).send("Error fetching data");
  }
});
//Delete the user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.status(201).send("User Deleted Successfully");
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
});
//Update the user in the database
app.patch("/user", async (req, res) => {
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: data._id }, data);
    res.status(201).send("User Updated Successfully");
  } catch (error) {
    res.status(500).send("Error updating user");
  }
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
