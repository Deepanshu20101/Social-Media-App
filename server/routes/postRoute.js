const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getFeed,
} = require("../controllers/post");
const router = express.Router();

router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/like/:id", likePost);
router.get("/:id", getPost);
router.get("/userFeed/all", getFeed);

module.exports = router;
