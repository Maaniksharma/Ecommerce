import PageConverter from '../utils/PageConverter.js';
import { connection } from '../configs/connectionConfig.js';

export default async (req, res) => {
  try {
    const [start] = await PageConverter(Number(req.query.pagecount));
    const [products] = await connection.query(
      'Select * from products LIMIT 5 OFFSET ?',
      [start]
    );
    res.send(products);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
