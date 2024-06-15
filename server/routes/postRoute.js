const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/post");
const router = express.Router();

router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/like/:id", likePost);

module.exports = router;
