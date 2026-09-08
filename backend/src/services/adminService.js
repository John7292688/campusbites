const adminModel = require("../models/adminModel");

const findAdminByEmail = async (email) => {
  return adminModel.findAdminByEmail(email);
};

module.exports = {
  findAdminByEmail,
};