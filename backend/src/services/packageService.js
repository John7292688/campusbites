const packageModel = require("../models/packageModel");
const restaurantModel = require("../models/restaurantModel");

// Create a new combo package
const createPackage = async (ownerId, packageData) => {
  const restaurant =
    await restaurantModel.getRestaurantByOwnerId(ownerId);

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return await packageModel.createPackage({
    restaurantId: restaurant.id,
    categoryId: packageData.categoryId,
    name: packageData.name,
    description: packageData.description,
    price: packageData.price,
    image: packageData.image,
    itemsIncluded: Array.isArray(packageData.itemsIncluded)
      ? packageData.itemsIncluded.join("\n")
      : packageData.itemsIncluded,
  });
};

// Get all packages
const getAllPackages = () => {
  return packageModel.getAllPackages();
};

// Get package by ID
const getPackageById = (packageId) => {
  return packageModel.getPackageById(packageId);
};

// Get packages for a restaurant
const getPackagesByRestaurant = (restaurantId) => {
  return packageModel.getPackagesByRestaurant(restaurantId);
};

// Update package (Owner only)
const updatePackage = async (
  ownerId,
  packageId,
  packageData
) => {
  const restaurant =
    await restaurantModel.getRestaurantByOwnerId(ownerId);

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const existingPackage =
    await packageModel.getPackageById(packageId);

  if (!existingPackage) {
    throw new Error("Package not found");
  }

  if (existingPackage.restaurant_id !== restaurant.id) {
    throw new Error(
      "You are not authorized to update this package."
    );
  }

  return await packageModel.updatePackage(packageId, {
    categoryId: packageData.categoryId,
    name: packageData.name,
    description: packageData.description,
    price: packageData.price,
    image: packageData.image,
    itemsIncluded: Array.isArray(packageData.itemsIncluded)
      ? packageData.itemsIncluded.join("\n")
      : packageData.itemsIncluded,
    isAvailable: packageData.isAvailable,
  });
};

// Delete package (Owner only)
const deletePackage = async (ownerId, packageId) => {
  const restaurant =
    await restaurantModel.getRestaurantByOwnerId(ownerId);

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const existingPackage =
    await packageModel.getPackageById(packageId);

  if (!existingPackage) {
    throw new Error("Package not found");
  }

  if (existingPackage.restaurant_id !== restaurant.id) {
    throw new Error(
      "You are not authorized to delete this package."
    );
  }

  return await packageModel.deletePackage(packageId);
};

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  getPackagesByRestaurant,
  updatePackage,
  deletePackage,
};