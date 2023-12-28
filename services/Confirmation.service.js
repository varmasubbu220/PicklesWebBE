// services/userService.js
const confirmationModel= require('../models/confirmation.model');
const createUser = async ({email,name,}) => {
    let obj={
        email,
        name,         
           }
      
  try {
    const user = await confirmationModel.create(obj);
    return { success: true, user };
  } catch (error) {
    console.error('Error creating user:', error.message);
    return { success: false, error: error.message };
  }
};
const getUserByFilter = async (options) => {
  try {

    const user = await confirmationModel.findOne(options);
 
    if (user) {


      return { success: true, user };
    } else {
      console.log("exit12")
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error getting user by filter:', error.message);
    return { success: false, error: error.message };
  }
};
const updateUser = async (filter, updatedData) => {
  try {
    const [rowsUpdated] = await confirmationModel.update(updatedData, {
      where: filter,
    });

    if (rowsUpdated > 0) {
      const updatedConfirmation = await confirmationModel.findOne({ where: filter });
      return { success: true, confirmation: updatedConfirmation?.dataValues || {} };
    } else {
      return { success: false, error: 'Confirmation not found or not updated' };
    }
  } catch (error) {
    console.error('Error updating confirmation:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { createUser,getUserByFilter,updateUser};
