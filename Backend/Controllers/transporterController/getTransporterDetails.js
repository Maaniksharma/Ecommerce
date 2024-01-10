import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  try {
    // Fetch product_id and quantity from orders table
    connection.beginTransaction();
    const [orderItems] = await connection.query(
      'SELECT orderId FROM transporter '
    );

    // Create an array to store the final result
    let orders = [];

    for (let orderItem of orderItems) {
      const [products] = await connection.query(
        "SELECT * FROM orders WHERE id = ? AND status IN ('NOT DISPATCHED','DISPATCHED') AND atTransporter=1",
        [orderItem.orderId]
      );
      // Fetch product details from products table
      for (let item of products) {
        const [products] = await connection.query(
          'SELECT * FROM products WHERE id = ?',
          [item.productId]
        );
        if (products.length > 0) {
          const product = products[0];
          orders.push({
            ...product,
            quantity: item.quantity,
            status: item.status,
            userEmail: item.userEmail,
            orderId: item.id,
          });
        }
      }
    }
    connection.commit();
    // Send the result
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(422).send({ error: 'Server Error' });
  }
};
