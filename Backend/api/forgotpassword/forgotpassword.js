import mailgun from '../../mailgun.js';
import jwt from 'jsonwebtoken';
import process from 'process';

export default (req, res) => {
  const secret = process.env.secretkey; // replace with your own secret key
  const payload = {
    userEmail: req.body.email, // replace with the user ID
    expires: Date.now() + 15 * 60 * 1000, // expires in 15 minutes
  };

  const token = jwt.sign(payload, secret);
  const String = `${process.env.url}/api/forgotpassword2?token=` + token;
  mailgun(req.body.email, String, 'Password Reset Link', (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Some error occured');
      return;
    } else {
      res.render('Email', { title: 'For Password Reset Link' });
    }
  });
};
