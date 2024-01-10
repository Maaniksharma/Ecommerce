import { connection } from '../../configs/connectionConfig.js';

export default async (req, res) => {
  try {
    const [products] = await connection.query('SELECT * FROM products LIMIT 5');
    res.render('home', {
      user: {
        userName: req.session.userName,
        userEmail: req.session.email,
      },
      products: products,
    });
  } catch (err) {
    console.error(err);
    res.send(500).send({ message: 'Server Error' });
  }
};
