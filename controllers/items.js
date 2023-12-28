const createItem = require('../services/Items.service');
const { handleAsyncError } = require('../utils/crudutil');

const createNewProduct = handleAsyncError(async (req, res) => {
  const {title,startingPrice,pricelist,stock, isDeleted,category,url} = req.body.document;
  const result = await createItem.createProduct({
    title,
    startingPrice,pricelist,stock, isDeleted,category,url}
  );
  if (result.success) {
    res.status(201).json({ success: true, user: result.user });
  } else {
    res.status(400).json({ success: false, error: result.error });
  }
});

module.exports = createNewProduct;
