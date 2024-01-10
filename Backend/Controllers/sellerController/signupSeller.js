import Mailgun from '../../mailgun.js';
import { connection } from '../../configs/connectionConfig.js';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  const { sellerName, email, password, phone, aaddhar_no } = req.body;
  try {
    const [results] = await connection.execute(
      'SELECT * FROM sellers WHERE email = ?',
      [email]
    );

    if (results.length > 0) {
      return res.send('Seller already exists');
    } else {
      try {
        await connection.execute(
          'INSERT INTO seller_requests (sellerName, email, password, phone, aaddhar_no, isVerified) VALUES (?, ?, ?, ?, ?, ?)',
          [sellerName, email, password, phone, aaddhar_no, 0]
        );
      } catch (error) {
        console.error('Error occurred during insertion:', error);
        res.status(500).send({ message: 'Server error' });
        return;
      }
      const MailToken = jwt.sign({ email }, process.env.secretkey, {
        expiresIn: '1h',
      });
      console.log(MailToken);
      const String =
        'http://localhost:5173/verifyemail?seller=true&&token=' + MailToken;
      Mailgun(email, String, 'Account Verification', () => {
        console.log('email sent');
      });
      return res.send({ message: 'Seller created' });
    }
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).send({ message: 'Server error' });
    }
    return;
  }
};
