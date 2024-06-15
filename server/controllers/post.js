const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const newpost = await Post.create(req.body);
    res.status(200).json({ post: newpost });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const foundPost = await Post.findById(req.params.id);
    if (foundPost) {
      if (foundPost.userId === req.body.userId) {
        await foundPost.updateOne({ $set: req.body });
        res.status(200).json({ message: "Post updated succesfully" });
      } else {
        res.status(403).json({ message: "Cannot update others post" });
      }
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const foundPost = await Post.findById(req.params.id);
    if (foundPost) {
      if (foundPost.userId === req.body.userId) {
        await foundPost.deleteOne();
        res.status(200).json({ message: "Post deleted succesfully" });
      } else {
        res.status(403).json({ message: "Cannot delete others post" });
      }
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const likePost = async (req, res) => {
  try {
    const foundPost = await Post.findById(req.params.id);
    if (foundPost) {
      if (!foundPost.likes.includes(req.body.userId)) {
        await foundPost.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json({ message: "Post liked successfully" });
      } else {
        await foundPost.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json({ message: "Post disliked successfully" });
      }
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createPost, updatePost, deletePost, likePost };
