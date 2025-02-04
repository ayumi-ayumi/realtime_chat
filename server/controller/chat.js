import Message from "../models/chat.js";

async function getAllMessages(req, res) {
  const _room = req.params.room;
  const messages = await Message.find({ room: _room });

  if (messages === null) return res.status(404).json({ msg: "Page Not Found" });
  res.json(messages);
}

async function saveMessage(req, res) {
  const message = new Message(req.body);
  const newMessage = await message.save();
  res.status(201).json(newMessage);
}

export { getAllMessages, saveMessage };
