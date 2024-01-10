import { connection } from '../../configs/connectionConfig.js';
export default async (req, res) => {
  const { email } = req.body;
  try {
    // Get the seller request
    const [[sellerRequest]] = await connection.query(
      'SELECT * FROM seller_requests WHERE email = ?',
      [email]
    );

    if (sellerRequest.length === 0) {
      res.status(404).send('Seller request not found');
      return;
    }
    // Insert the seller request into the sellers table
    await connection.query(
      'INSERT INTO sellers values(?,?,?,?,?,?)',
      Object.values(sellerRequest)
    );

    // Delete the seller request from the seller_requests table
    await connection.query('DELETE FROM seller_requests WHERE email = ?', [
      email,
    ]);
    res.status(200).send({ message: 'Seller approved successfully' });
  } catch (error) {
    console.error('An error occurred while approving seller:', error);
    res.status(500).send({ message: 'Server Error' });
  }
};
