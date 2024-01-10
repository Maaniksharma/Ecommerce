import { connection } from '../../configs/connectionConfig.js';
export default async (req, res) => {
  try {
    const itemId = req.query.itemId;

    const email = req.email;
    // Check if a cart exists for the user's email
    const [carts] = await connection.execute(
      'SELECT * FROM carts WHERE email = ?',
      [email]
    );

    let cartId;
    if (carts.length > 0) {
      // If a cart exists, get the cart id
      cartId = carts[0].id;
    } else {
      // If a cart doesn't exist, create a new one
      const [result] = await connection.execute(
        'INSERT INTO carts (email) VALUES (?)',
        [email]
      );
      cartId = result.insertId;
    }

    // Check if the item already exists in the cart
    const [items] = await connection.execute(
      'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?',
      [cartId, itemId]
    );

    if (items.length > 0) {
      // If the item exists, increment the quantity
      await connection.execute(
        'UPDATE cart_items SET quantity = quantity + 1 WHERE cart_id = ? AND product_id = ?',
        [cartId, itemId]
      );
    } else {
      // If the item doesn't exist, add it to the cart
      await connection.execute(
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, 1)',
        [cartId, itemId]
      );
    }

    res.status(200).send({ message: 'Item added to cart' });
  } catch (err) {
    console.error(err);
    res.send(500).send({ error: 'Internal Server Error' });
  }
};
