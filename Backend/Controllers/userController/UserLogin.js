import mailgun from '../../mailgun.js';
import jwt from 'jsonwebtoken';
import { connection } from '../../configs/connectionConfig.js';
import process from 'process';

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    const user = users[0];

    if (!user) {
      res.json({ err: 1 });
      return;
    }

    if (user.isVerified) {
      req.session.is_logged_in = true;
      const newUser = {
        userName: user.userName,
        email: user.email,
        delivery_address: user.delivery_address,
      };
      const token = jwt.sign({ email }, process.env.secretkey, {
        expiresIn: '10m',
      });
      const refreshToken = jwt.sign({ email }, process.env.secretkey, {
        expiresIn: '30m',
      });
      res.json({ token: token, refreshToken: refreshToken, user: newUser });
    } else {
      const MailToken = jwt.sign({ email }, process.env.secretkey, {
        expiresIn: '1d',
      });
      console.log(MailToken);
      const String = `${process.env.url}/verify?token=` + MailToken;
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
