import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  try {
    const email = req.email;
    const id = req.query.id;
    connection.beginTransaction();
    const [result] = await connection.execute(
      'SELECT * FROM orders WHERE id =? AND sellerEmail = ?',
      [id, email]
    );
    connection.execute('update orders set atTransporter = 1 where id = ?', [
      result[0].id,
    ]);
    connection.execute(
      'UPDATE seller_products SET quantity_sold = quantity_sold + 1 WHERE product_id =? AND seller_email =?',
      [id, email]
    );
    connection.execute(`insert into transporter (orderId) values(?)`, [
      result[0].id,
    ]);
    connection.commit();
    // Send the result
    res.status(200).json(result);
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    res.status(500).json({ err: 'Server Error' });
  }
};
