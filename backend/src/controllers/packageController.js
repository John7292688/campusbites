const packageService = require("../services/packageService");

const createPackage = async (req, res) => {
  try {
    const ownerId = req.owner.id;

    const packageData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    };

    const newPackage = await packageService.createPackage(
      ownerId,
      packageData
    );

    res.status(201).json({
      success: true,
      message: "Package created successfully",
      data: newPackage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPackageById = async (req, res) => {
  try {
    const packageData = await packageService.getPackageById(
      req.params.packageId
    );

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.json({
      success: true,
      data: packageData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPackagesByRestaurant = async (req, res) => {
  try {
    const packages =
      await packageService.getPackagesByRestaurant(
        req.params.restaurantId
      );

    res.json({
      success: true,
      data: packages,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePackage = async (req, res) => {
  try {
    const updatedPackage =
      await packageService.updatePackage(
        req.params.packageId,
        req.body
      );

    res.json({
      success: true,
      message: "Package updated successfully",
      data: updatedPackage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePackage = async (req, res) => {
  try {
    await packageService.deletePackage(
      req.params.packageId
    );

    res.json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addMenuItemToPackage = async (req, res) => {
  try {
    const ownerId = req.owner.id;

    const { packageId } = req.params;
    const { menuId, quantity } = req.body;

    const item =
      await packageService.addMenuItemToPackage(
        ownerId,
        packageId,
        menuId,
        quantity
      );

    res.status(201).json({
      success: true,
      message: "Menu item added to package successfully",
      data: item,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeMenuItemFromPackage = async (req, res) => {
  try {
    const ownerId = req.owner.id;

    const { packageId, menuId } = req.params;

    await packageService.removeMenuItemFromPackage(
      ownerId,
      packageId,
      menuId
    );

    res.json({
      success: true,
      message: "Menu item removed from package successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPackageItems = async (req, res) => {
  try {
    const items =
      await packageService.getPackageItems(
        req.params.packageId
      );

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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