import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  try {
    const { itemId } = req.query;
    const email = req.email;
    const [[{ id: cart_id }]] = await connection.query(
      'SELECT id FROM carts WHERE email = ?',
      [email]
    );
    const [[product]] = await connection.query(
      'SELECT * FROM cart_items WHERE product_id = ? AND cart_id = ?',
      [itemId, cart_id]
    );

    if (product) {
      if (product.quantity > 1) {
        await connection.query(
          'UPDATE cart_items SET quantity = quantity - 1 WHERE product_id = ? AND cart_id = ?',
          [itemId, cart_id]
        );
      } else {
        await connection.query(
          'DELETE FROM cart_items WHERE product_id = ? AND cart_id = ?',
          [itemId, cart_id]
        );
      }
    }

    res.status(200).send({ message: 'Item removed from  cart' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};
