const express = require("express");
const bcrypt = require("bcrypt");
const { signupValidation } = require("../utils/validation");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

//Add a user to the database
authRouter.post("/signup", async (req, res) => {
  // console.log(req.body);
  const { firstName, lastName, email, password } = req.body;
  try {
    //Validation of data
    signupValidation(req);
    //Encryption of password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    await user.save();
    res.status(201).send("User added successfully");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

//login api
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$123", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      console.log(token);
      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successful");
});

module.exports = authRouter;
