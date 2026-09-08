const express = require("express");

const router = express.Router();

const contactController =
  require("../controllers/contactController");

router.post(
  "/",
  contactController.createMessage
);

router.get(
  "/",
  contactController.getAllMessages
);

router.patch(
  "/:id/read",
  contactController.markAsRead
);

module.exports = router;