const contactModel = require("../models/contactModel");

const createMessage = async (
  name,
  email,
  subject,
  message
) => {
  return await contactModel.createMessage(
    name,
    email,
    subject,
    message
  );
};

const getAllMessages = async () => {
  return await contactModel.getAllMessages();
};

const markAsRead = async (id) => {
  return await contactModel.markAsRead(id);
};

module.exports = {
  createMessage,
  getAllMessages,
  markAsRead,
};