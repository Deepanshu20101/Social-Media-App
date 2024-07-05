const Conversation = require("../models/Conversation");

const createConversation = async (req, res) => {
  try {
    const conversation = await Conversation.create(req.body);
    res.status(200).json({
      message: "Conversation created succesfully",
      conversation: conversation,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json({ conversation: conversation });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createConversation, getConversation };
