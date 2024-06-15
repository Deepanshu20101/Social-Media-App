const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unFollowUser,
} = require("../controllers/user");

const router = express.Router();

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.put("/follow/:id", followUser);
router.put("/unfollow/:id", unFollowUser);

module.exports = router;
