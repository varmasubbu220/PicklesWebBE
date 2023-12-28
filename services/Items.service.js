
const itemsModel= require('../models/items.model');
const createProduct = async (payload) => {
console.log(payload)
  try {
    const user = await itemsModel.create(payload);
    return { success: true, user };
  } catch (error) {
    console.error('Error creating item:', error.message);
    return { success: false, error: error.message };
  }
};
module.exports = { createProduct};
