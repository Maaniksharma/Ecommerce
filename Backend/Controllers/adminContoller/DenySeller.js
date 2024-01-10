import { connection } from '../../configs/connectionConfig.js';
export default async (req, res) => {
  const { email } = req.body;
  try {
    // Get the seller request
    await connection.query('Delete  FROM seller_requests WHERE email = ?', [
      email,
    ]);

    res.status(200).send({ message: 'Seller denied successfully' });
  } catch (error) {
    // Delete the seller request from the seller_requests table
    console.error('An error occurred while approving seller:', error);
    res.status(500).send({ message: 'Server Error' });
  }
};
