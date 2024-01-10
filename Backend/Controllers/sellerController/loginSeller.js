import process from 'process';
import mailgun from '../../mailgun.js';
import jwt from 'jsonwebtoken';
import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    const [sellers] = await connection.execute(
      'SELECT * FROM sellers WHERE email = ? AND password = ?',
      [email, password]
    );
    const seller = sellers[0];

    if (!seller) {
      res.json({ err: 1 });
      return;
    }

    if (seller.isVerified) {
      req.session.is_logged_in = true;
      const newSeller = {
        sellerName: seller.sellerName,
        email: seller.email,
      };
      const token = jwt.sign({ email }, process.env.secretkey, {
        expiresIn: '10s',
      });
      const refreshToken = jwt.sign({ email }, process.env.secretkey, {
        expiresIn: '30m',
      });
      res.json({
        sellertoken: token,
        seller: newSeller,
        refreshToken: refreshToken,
      });
    } else {
      const MailToken = jwt.sign({ email }, process.env.secretkey, {
        expiresIn: '1d',
      });
      const String = `${process.env.clienturl}/verify?token=` + MailToken;
      mailgun(email, String, 'Account Verification', () => {
        console.log('email sent');
      });
      res.json({ err: 2 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ err: 3 });
  }
};
