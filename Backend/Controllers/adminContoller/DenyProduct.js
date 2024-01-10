import { connection } from '../../configs/connectionConfig.js';
export default async (req, res) => {
  const { id } = req.body.productRequest;
  try {
    // Get the seller request
    await connection.query('Delete  FROM product_requests WHERE id = ?', [id]);

    res.status(200).send({ message: 'product denied successfully' });
  } catch (error) {
    // Delete the seller request from the seller_requests table
    console.error('An error occurred while approving product:', error);
    res.status(500).send({ message: 'Server Error' });
  }
};
