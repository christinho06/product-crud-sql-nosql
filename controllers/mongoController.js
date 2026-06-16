const Product = require('../models/mongo/Product');

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ status: 'success', product });
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ status: 'success', count: products.length, products });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ status: 'success', product });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ status: 'success', product });
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(204).send();
  } catch (err) { res.status(500).json({ error: err.message }); }
};