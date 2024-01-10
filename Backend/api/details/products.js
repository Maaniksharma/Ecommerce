import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  const productId = req.query.id;
  try {
    const [productDetails] = await connection.query(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    );
    if (productDetails.length === 0) {
      return res.status(404).send('Product not found');
    }
    const product = productDetails[0];
    product.variants = product.variants.split(',');
    console.log(product);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
