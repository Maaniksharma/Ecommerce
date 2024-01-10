import { connection } from '../../configs/connectionConfig.js';
export default async (req, res) => {
  try {
    connection.beginTransaction();
    // Execute the SQL query
    const [sellerRows] = await connection.query(
      'SELECT * FROM seller_requests WHERE isVerified=1'
    );
    const [productRows] = await connection.query(
      'SELECT * FROM product_requests;'
    );
    connection.commit();

    // Remove the password field from each row
    const results = sellerRows.map((row) => {
      const { password, ...rest } = row;
      return rest;
    });

    return res.json({
      seller_requests: results,
      product_requests: productRows,
    });
  } catch (err) {
    console.error('An error occurred while fetching seller requests:', err);
    if (err.message === 'Invalid token') {
      return res.status(401).send({ message: 403 });
    }
    if (!res.headersSent) {
      return res
        .status(500)
        .send({ message: 'An error occurred while fetching seller requests' });
    }
  }
};
