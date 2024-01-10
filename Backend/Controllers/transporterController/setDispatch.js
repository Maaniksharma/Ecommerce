import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  try {
    const { orderId } = req.query;
    connection.execute('UPDATE orders SET status = ? WHERE id =?', [
      'DISPATCHED',
      orderId,
    ]);
    res.status(200).json({ message: 'Dispatched' });
  } catch (error) {
    console.error(error);
    res.status(422).send({ error: 'Server Error' });
  }
};
