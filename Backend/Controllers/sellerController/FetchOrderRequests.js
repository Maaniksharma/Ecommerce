import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  try {
    const email = req.email;

    // Fetch product_id and quantity from orders table
    const [orderItems] = await connection.query(
      "SELECT id,productId, quantity, userEmail, status,atTransporter FROM orders WHERE sellerEmail = ? AND status NOT IN ('Delivered','DELIVERED')",
      [email]
    );

    // Create an array to store the final result
    let orders = [];

    for (let orderItem of orderItems) {
      // Fetch product details from products table
      const [products] = await connection.query(
        'SELECT * FROM products WHERE id = ?',
        [orderItem.productId]
      );

      // Combine quantity and product details
      if (products.length > 0) {
        const product = products[0];
        orders.push({
          ...product,
          id: orderItem.id,
          quantity: orderItem.quantity,
          status: orderItem.status,
          userEmail: orderItem.userEmail,
          atTransporter: orderItem.atTransporter,
        });
      }
    }
    // Send the result
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(422).send({ err: 'Server Error' });
  }
};
