const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const user = await UserModel.find();
    if (user) {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;

    const userData = new UserModel({ name, email, password, cpassword });
    const userExist = await UserModel.findOne({ email: email });
    if (userExist) {
      return res.status(422).send("User Already Exists");
    } else if (password != cpassword) {
      return res
        .status(422)
        .send("password and confirm password doesn't match");
    } else {
      const registered = await userData.save();
      res.status(201).send(registered);
      console.log(registered);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      if (password === userExist.password) {
        res.status(200).send({ message: "login successfull", data: userExist });
      } else {
        res.status(422).send("username and password din't match");
      }
    } else {
      return res.status(422).send("User Not Registered");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
