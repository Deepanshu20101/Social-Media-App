const bcrypt = require("bcrypt");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const password = req.body.password;
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPwd,
    });
    res.status(200).json({ message: "User created succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email }).exec();
    !foundUser && res.status(404).json({ message: "User not found" });
    if (foundUser) {
      const match = await bcrypt.compare(password, foundUser.password);
      if (match) {
        res.status(200).json({ user: foundUser });
      } else {
        res.status(400).json({ error: "Incorrect password" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, login };
