const deliveryLocationModel = require(
  "../models/deliveryLocationModel"
);

const getAllDeliveryLocations = async () => {
  return await deliveryLocationModel.getAllDeliveryLocations();
};

const createDeliveryLocation = async (
  locationName,
  deliveryFee
) => {
  return await deliveryLocationModel.createDeliveryLocation(
    locationName,
    deliveryFee
  );
};

const deleteDeliveryLocation = async (
  id
) => {
  return await deliveryLocationModel.deleteDeliveryLocation(
    id
  );
};

const updateDeliveryLocation = async (
  id,
  locationName,
  deliveryFee
) => {
  return await deliveryLocationModel.updateDeliveryLocation(
    id,
    locationName,
    deliveryFee
  );
};

module.exports = {
  getAllDeliveryLocations,
  createDeliveryLocation,
  deleteDeliveryLocation,
  updateDeliveryLocation,
};