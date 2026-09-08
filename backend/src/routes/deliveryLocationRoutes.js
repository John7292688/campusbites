const express = require("express");

const router = express.Router();

const deliveryLocationController = require(
  "../controllers/deliveryLocationController"
);

router.get(
  "/",
  deliveryLocationController.getAllDeliveryLocations
);

router.post(
  "/",
  deliveryLocationController.createDeliveryLocation
);

router.delete(
  "/:id",
  deliveryLocationController.deleteDeliveryLocation
);

router.put(
  "/:id",
  deliveryLocationController.updateDeliveryLocation
);

module.exports = router;