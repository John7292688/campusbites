const asyncHandler =
  require("express-async-handler");

const contactService =
  require("../services/contactService");

const createMessage = asyncHandler(
  async (req, res) => {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    const contact =
      await contactService.createMessage(
        name,
        email,
        subject,
        message
      );

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  }
);

const getAllMessages = asyncHandler(
  async (req, res) => {
    const messages =
      await contactService.getAllMessages();

    res.status(200).json({
      success: true,
      messages,
    });
  }
);

const markAsRead = asyncHandler(
  async (req, res) => {
    const message =
      await contactService.markAsRead(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message,
    });
  }
);

module.exports = {
  createMessage,
  getAllMessages,
  markAsRead,
};