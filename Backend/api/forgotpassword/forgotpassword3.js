import jwt from 'jsonwebtoken';
import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  const { token } = req.query;
  const password = req.body.password;
  let userEmail;
  if (token === undefined) {
    userEmail = req.session.email;
  } else {
    let decoded = jwt.verify(token, process.env.secretkey);
    userEmail = decoded.userEmail;
  }
  console.log(userEmail, password);

  try {
    await connection.execute('UPDATE users SET password = ? WHERE email = ?', [
      password,
      userEmail,
    ]);
    res.render('finishpasswordreset');
  } catch (err) {
    console.error(err);
    res.end('Something went wrong');
  }
};
