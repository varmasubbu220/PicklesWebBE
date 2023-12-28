// services/userService.js
const userModel= require('../models/user.model');
const createUser = async (payload) => {         
  try {
    const user = await userModel.create(payload);
    return { success: true, user };
  } catch (error) {
    console.error('Error creating user:', error.message);
    return { success: false, error: error.message };
  }
};
module.exports = { createUser };
