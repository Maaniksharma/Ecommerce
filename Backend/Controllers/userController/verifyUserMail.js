import jwt from 'jsonwebtoken';
import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  try {
    const DEmail = jwt.decode(req.query.token).email;
    connection.execute(
      'UPDATE users SET isVerified = 1 WHERE email = ?',
      [DEmail],
      (err) => {
        if (err) {
          return res.status(401).send({ error: 'Server error' });
        } else {
          req.session.is_logged_in = true;
          res.send({ message: 'verified' });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
