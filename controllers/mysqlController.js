const db = require('../config/mysql');

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category = 'general', inStock = true } = req.body;
    const [result] = await db.execute('INSERT INTO products (name, price, category, inStock) VALUES (?, ?, ?, ?)', [name, price, category, inStock]);
    res.status(201).json({ status: 'success', productId: result.insertId });
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await db.execute('SELECT * FROM products');
    res.json({ status: 'success', count: products.length, products });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getProductById = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Product not found' });
    res.json({ status: 'success', product: rows[0] });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;
    const [result] = await db.execute('UPDATE products SET name=?, price=?, category=?, inStock=? WHERE id=?', [name, price, category, inStock, req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Product not found' });
    res.json({ status: 'success', message: 'Product updated' });
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteProduct = async (req, res) => {
  try {
    const [result] = await db.execute('DELETE FROM products WHERE id=?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Product not found' });
    res.status(204).send();
  } catch (err) { res.status(500).json({ error: err.message }); }
};