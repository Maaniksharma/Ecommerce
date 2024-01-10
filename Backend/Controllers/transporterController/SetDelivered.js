import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  try {
    const { orderId } = req.query;
    connection.execute('UPDATE orders SET status = ? WHERE id =?', [
      'DELIVERED',
      orderId,
    ]);
    res.status(200).json({ message: 'Delivered' });
  } catch (error) {
    console.error(error);
    res.status(422).send({ error: 'Server Error' });
  }
};
