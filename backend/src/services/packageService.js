const packageModel = require("../models/packageModel");
const restaurantModel = require("../models/restaurantModel");
const menuModel = require("../models/menuModel");

const createPackage = async (ownerId, packageData) => {
  const restaurant =
    await restaurantModel.getRestaurantByOwnerId(ownerId);

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return await packageModel.createPackage({
    restaurantId: restaurant.id,
    ...packageData,
  });
};

const getPackageById = (packageId) => {
  return packageModel.getPackageById(packageId);
};

const getPackagesByRestaurant = (restaurantId) => {
  return packageModel.getPackagesByRestaurant(
    restaurantId
  );
};

const updatePackage = (
  packageId,
  packageData
) => {
  return packageModel.updatePackage(
    packageId,
    packageData
  );
};

const deletePackage = (packageId) => {
  return packageModel.deletePackage(packageId);
};

const addMenuItemToPackage = async (
  ownerId,
  packageId,
  menuId,
  quantity
) => {
  const restaurant =
    await restaurantModel.getRestaurantByOwnerId(ownerId);

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const packageData =
    await packageModel.getPackageById(packageId);

  if (!packageData) {
    throw new Error("Package not found");
  }

  if (packageData.restaurant_id !== restaurant.id) {
    throw new Error(
      "You can only modify your own packages."
    );
  }

  const menuItem =
    await menuModel.getMenuItemByRestaurant(
      menuId,
      restaurant.id
    );

  if (!menuItem) {
    throw new Error(
      "Menu item does not belong to your restaurant."
    );
  }

  return await packageModel.addMenuItemToPackage(
    packageId,
    menuId,
    quantity
  );
};

const removeMenuItemFromPackage = async (
  ownerId,
  packageId,
  menuId
) => {
  const restaurant =
    await restaurantModel.getRestaurantByOwnerId(ownerId);

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const packageData =
    await packageModel.getPackageById(packageId);

  if (!packageData) {
    throw new Error("Package not found");
  }

  if (packageData.restaurant_id !== restaurant.id) {
    throw new Error(
      "You can only modify your own packages."
    );
  }

  await packageModel.removeMenuItemFromPackage(
    packageId,
    menuId
  );
};

const getPackageItems = async (packageId) => {
  return await packageModel.getPackageItems(packageId);
};

module.exports = {
  createPackage,
  getPackageById,
  getPackagesByRestaurant,
  updatePackage,
  deletePackage,
  addMenuItemToPackage,
  removeMenuItemFromPackage,
  getPackageItems,
};