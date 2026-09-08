const deliveryLocationService = require(
  "../services/deliveryLocationService"
);

const getAllDeliveryLocations = async (
  req,
  res
) => {
  try {
    const locations =
      await deliveryLocationService.getAllDeliveryLocations();

    return res.status(200).json({
      success: true,
      data: locations,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch delivery locations",
    });
  }
};

const createDeliveryLocation = async (
  req,
  res
) => {
  try {
    const { location_name, delivery_fee } =
      req.body;

    const location =
      await deliveryLocationService.createDeliveryLocation(
        location_name,
        delivery_fee
      );

    return res.status(201).json({
      success: true,
      message:
        "Delivery location created successfully",
      data: location,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to create delivery location",
    });
  }
};

const deleteDeliveryLocation = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const location =
      await deliveryLocationService.deleteDeliveryLocation(
        id
      );

    return res.status(200).json({
      success: true,
      message:
        "Location deleted successfully",
      data: location,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete location",
    });
  }
};

const updateDeliveryLocation = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      location_name,
      delivery_fee,
    } = req.body;

    const location =
      await deliveryLocationService.updateDeliveryLocation(
        id,
        location_name,
        delivery_fee
      );

    return res.status(200).json({
      success: true,
      message:
        "Location updated successfully",
      data: location,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to update location",
    });
  }
};

module.exports = {
  getAllDeliveryLocations,
  createDeliveryLocation,
  deleteDeliveryLocation,
  updateDeliveryLocation,
};