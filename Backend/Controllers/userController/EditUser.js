import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  try {
    // Replace with your actual secret key
    const { user } = req.body;
    const email = req.email;
    await connection.query(
      'UPDATE users SET userName=? , delivery_address=? WHERE email = ?;',
      [user.userName, user.delivery_address, email]
    );
    res.status(200).send({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    if (err.name === 'JsonWebTokenError') {
      res.status(401).send({ error: 'Unauthorized' });
    } else {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
};
