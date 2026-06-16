const express = require('express');
const router = express.Router();
const c = require('../controllers/mongoController');
router.get('/', c.getAllProducts);
router.post('/', c.createProduct);
router.get('/:id', c.getProductById);
router.put('/:id', c.updateProduct);
router.delete('/:id', c.deleteProduct);
module.exports = router;