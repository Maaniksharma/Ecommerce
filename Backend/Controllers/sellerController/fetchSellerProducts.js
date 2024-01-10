import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  try {
    // Get product_ids and quantity_sold from seller_products table
    const email = req.email;

    const [sellerProducts] = await connection.query(
      'SELECT product_id, quantity_sold FROM seller_products WHERE seller_email = ?',
      [email]
    );
    // Create an array to store the final result
    let result = [];

    for (let sellerProduct of sellerProducts) {
      // Get product details from products table
      const [products] = await connection.query(
        'SELECT * FROM products WHERE id = ?',
        [sellerProduct.product_id]
      );

      // Combine product details and quantity_sold
      if (products.length > 0) {
        const product = products[0];
        result.push({
          ...product,
          quantity_sold: sellerProduct.quantity_sold,
        });
      }
    }

    // Send the result
    res.json(result);
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    res.status(500).json({ err: 'Server Error' });
  }
};
