const express = require("express");
const {
  createConversation,
  getConversation,
} = require("../controllers/conversation");
const router = express.Router();

router.post("/", createConversation);
router.get("/:userId", getConversation);

module.exports = router;
