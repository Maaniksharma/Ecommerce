import { connection } from '../../configs/connectionConfig.js';
import getCurrentDate from '../../utils/getCurrentDate.js';
export default async (req, res) => {
  try {
    const { orderId } = req.query;
    connection.execute(
      'UPDATE orders SET status = ?, Delivered_at=? WHERE id =?',
      ['DELIVERED', getCurrentDate(), orderId]
    );
    res.status(200).json({ message: 'Delivered' });
  } catch (error) {
    console.error(error);
    res.status(422).send({ error: 'Server Error' });
  }
};
