const packageService = require("../services/packageService");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const deleteFromCloudinary = require("../utils/deleteFromCloudinary");

// ==============================
// Create Package
// ==============================
const createPackage = async (req, res) => {
  try {
    const ownerId = req.owner.id;

    let imageUrl = null;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const packageData = {
      categoryId: req.body.categoryId,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: imageUrl,
      itemsIncluded: req.body.itemsIncluded,
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

// ==============================
// Get All Packages
// ==============================
const getAllPackages = async (req, res) => {
  try {
    const packages = await packageService.getAllPackages();

    res.json({
      success: true,
      count: packages.length,
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

// ==============================
// Get Package By ID
// ==============================
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

// ==============================
// Get Packages By Restaurant
// ==============================
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

// ==============================
// Update Package
// ==============================
const updatePackage = async (req, res) => {
  try {
    const ownerId = req.owner.id;

    const existingPackage =
      await packageService.getPackageById(req.params.packageId);

    if (!existingPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    let imageUrl = existingPackage.image;

    if (req.file) {
      await deleteFromCloudinary(existingPackage.image);

      const uploadedImage = await uploadToCloudinary(
        req.file.buffer
      );

      imageUrl = uploadedImage.secure_url;
    }

    const packageData = {
      categoryId: req.body.categoryId,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: imageUrl,
      itemsIncluded: req.body.itemsIncluded,
      isAvailable: req.body.isAvailable,
    };

    const updatedPackage =
      await packageService.updatePackage(
        ownerId,
        req.params.packageId,
        packageData
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

// ==============================
// Delete Package
// ==============================
const deletePackage = async (req, res) => {
  try {
    const ownerId = req.owner.id;

    const existingPackage =
      await packageService.getPackageById(req.params.packageId);

    if (!existingPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    await deleteFromCloudinary(existingPackage.image);

    await packageService.deletePackage(
      ownerId,
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

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  getPackagesByRestaurant,
  updatePackage,
  deletePackage,
};