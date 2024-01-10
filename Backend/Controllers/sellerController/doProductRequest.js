import { v4 as uuidv4 } from 'uuid';
import { connection } from '../../configs/connectionConfig.js';
import process from 'process';

export default async (req, res) => {
  const productId = uuidv4(); // Generate a new UUID

  try {
    const email = req.email;
    let { productName, price, variants, imageUrl } = req.body;
    if (!imageUrl || imageUrl.length === 0 || imageUrl == 'null') {
      imageUrl = `${process.env.url}/uploads/` + req.file.filename;
    }
    await connection.execute(
      'INSERT INTO product_requests (id, productName, price, imageUrl,variants,sellerEmail) VALUES (?, ?, ?, ?, ?, ?)',
      [productId, productName, price, imageUrl, variants, email]
    );
    res.status(200).send({ message: 'Product added' });
  } catch (error) {
    console.error(error);
    res.status(422).send({ err: 'Server Error' });
  }
};
