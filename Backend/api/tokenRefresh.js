import jwt from 'jsonwebtoken';
import process from 'process';

export default async function TokenRefresh(req, res) {
  try {
    const refreshToken = req.body.token;
    const decoded = jwt.verify(refreshToken, process.env.secretkey);
    let data = {};
    if (decoded.data) {
      data.data = decoded.data;
    } else {
      data.email = decoded.email;
    }
    console.log(data);
    const token = jwt.sign(data, process.env.secretkey, { expiresIn: '30m' });
    res.json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: 'server error' });
  }
}
