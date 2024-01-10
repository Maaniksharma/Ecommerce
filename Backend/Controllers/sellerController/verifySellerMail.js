import jwt from 'jsonwebtoken';
import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  try {
    const DEmail = jwt.decode(req.query.token).email;

    try {
      await connection.execute(
        'UPDATE seller_requests SET isVerified = 1 WHERE email = ?',
        [DEmail]
      );
      req.session.is_logged_in = true;
      res.send({ message: 'verified' });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Server error' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};
