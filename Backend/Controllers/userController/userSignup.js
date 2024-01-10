import Mailgun from '../../mailgun.js';
import { connection } from '../../configs/connectionConfig.js';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.send('User already exists');
    } else {
      try {
        await connection.execute(
          'INSERT INTO users (userName, email, password, isVerified) VALUES (?, ?, ?, ?)',
          [username, email, password, 0]
        );
      } catch (error) {
        console.error('Error occurred during insertion:', error);
        res.status(500).send({ error: 'Server error' });
        return;
      }

      const MailToken = jwt.sign({ email }, process.env.secretkey, {
        expiresIn: '1d',
      });
      const String = 'http://localhost:5173/verifyemail?token=' + MailToken;

      Mailgun(email, String, 'Account Verification', () => {
        console.log('email sent');
      });

      return res.send({ error: 'User created' });
    }
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).send({ error: 'Server error' });
    }
    return;
  }
};
