import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  try {
    const email = req.email;

    // Fetch id from carts table
    connection.beginTransaction();
    const [carts] = await connection.query(
      'SELECT id FROM carts WHERE email = ?',
      [email]
    );
    console.log(carts);
    if (carts.length > 0) {
      const id = carts[0].id;

      // Delete entries from cart_items table
      await connection.query('DELETE FROM cart_items WHERE cart_id = ?', [id]);
    }

    connection.commit();
    res.status(200).send({ message: 'Cart cleared' });
  } catch (error) {
    console.error(error);
    res.status(422).send({ err: 'Server Error' });
  }
};
