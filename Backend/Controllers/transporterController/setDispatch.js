import { connection } from '../../configs/connectionConfig.js';
import getCurrentDate from '../../utils/getCurrentDate.js';

export default async (req, res) => {
  try {
    const { orderId } = req.query;
    connection.execute(
      'UPDATE orders SET status = ?,Dispatched_at=?  WHERE id =?',
      ['DISPATCHED', getCurrentDate(), orderId]
    );
    res.status(200).json({ message: 'Dispatched' });
  } catch (error) {
    console.error(error);
    res.status(422).send({ error: 'Server Error' });
  }
};
