const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { profileEditValidation } = require("../utils/validation");
const { User } = require("../models/user");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    // console.log("logged in user :" + _id);
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: ", +error.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!profileEditValidation) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} your profile update successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(401).send("Error: " + error.message);
  }
});

module.exports = profileRouter;
