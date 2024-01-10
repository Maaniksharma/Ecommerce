import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  try {
    const email = req.email;
    if (req.query.count) {
      const [rows] = await connection.query(
        'SELECT COUNT(*) as count FROM carts JOIN cart_items ON carts.id = cart_items.cart_id WHERE carts.email = ?;',
        [email]
      );
      res.json({ count: rows[0].count });
    } else {
      const [cart] = await connection.query(
        'SELECT p.*,ci.quantity FROM carts c JOIN cart_items ci ON c.id = ci.cart_id JOIN products p ON ci.product_id = p.id WHERE c.email = ?',
        [email]
      );
      return res.json({ cart: cart });
    }
  } catch (err) {
    console.error(err);
    if (err.name === 'JsonWebTokenError') {
      res.status(401).send({ error: 'Unauthorized' });
    } else {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
};
