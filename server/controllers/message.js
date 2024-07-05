const Message = require("../models/Message");

const createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(200).json({ message: "Message created succesfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessage = async (req, res) => {
  try {
    const message = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json({ message: message });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createMessage, getMessage };
