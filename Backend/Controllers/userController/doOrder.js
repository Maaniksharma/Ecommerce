import { connection } from '../../configs/connectionConfig.js';
import getCurrentDate from '../../utils/getCurrentDate.js';
export default async (req, res) => {
  try {
    const userEmail = req.email;
    const { products } = req.body;

    for (let product of products) {
      // Fetch sellerEmail from seller_products table
      const [sellerProducts] = await connection.query(
        'SELECT seller_email FROM seller_products WHERE product_id = ?',
        [product.id]
      );

      if (sellerProducts.length > 0) {
        const sellerEmail = sellerProducts[0].seller_email;

        // Insert into orders table
        await connection.query(
          'INSERT INTO orders (productId, userEmail, quantity, sellerEmail,Created_at) VALUES (?, ?, ?, ?,?)',
          [
            product.id,
            userEmail,
            product.quantity,
            sellerEmail,
            getCurrentDate(),
          ]
        );
      }
    }

    res.status(200).send({ message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server Error' });
  }
};
