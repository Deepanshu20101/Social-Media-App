const User = require("../models/User");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const foundUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json({ message: "Account updated succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Account deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    !foundUser && res.status(404).json({ message: "User not found" });
    const { password, ...others } = foundUser._doc;
    res.status(200).json({ user: others });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const followUser = async (req, res) => {
  try {
    if (req.body.userId === req.params.id) {
      res.status(400).json({ message: "You cannot follow yourself" });
    } else {
      const user = await User.findById(req.body.userId);
      const targetUser = await User.findById(req.params.id);
      if (!user || !targetUser) {
        res.status(404).json({ message: "User not found" });
      }
      if (user.following.includes(req.params.id)) {
        res.status(400).json({ message: "You already follow this user" });
      } else {
        await user.updateOne({ $push: { following: req.params.id } });
        await targetUser.updateOne({ $push: { followers: req.body.userId } });
        res.status(200).json({ message: "User followed succesfully" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const unFollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const targetUser = await User.findById(req.params.id);
    if (!user || !targetUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      if (user.following.includes(req.params.id)) {
        await user.updateOne({ $pull: { following: req.params.id } });
        await targetUser.updateOne({ $pull: { followers: req.body.userId } });
        res.status(200).json({ message: "User unfollowed succesfully" });
      } else {
        res.status(400).json({ message: "You do not follow this user" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { updateUser, deleteUser, getUser, followUser, unFollowUser };
