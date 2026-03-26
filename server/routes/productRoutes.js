const express = require('express');
const router = express.Router();
// Make sure bulkDeleteProducts is included in the import line below:
const { getProducts, createProduct, updateProduct, deleteProduct, bulkDeleteProducts } = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// ADD THIS LINE BELOW:
router.post('/bulk-delete', bulkDeleteProducts);

module.exports = router;