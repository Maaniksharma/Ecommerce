import { connection } from '../../configs/connectionConfig.js';
export default async (req, res) => {
  const { email } = req.body;
  try {
    // Get the seller request
    const { productRequest } = req.body;
    connection.beginTransaction();
    await connection.query('INSERT INTO products values(?,?,?,?,?)', [
      productRequest.id,
      productRequest.productName,
      productRequest.price,
      productRequest.imageUrl,
      productRequest.variants,
    ]);
    await connection.query('DELETE FROM product_requests WHERE id = ?', [
      productRequest.id,
    ]);
    await connection.query(
      'insert into seller_products(seller_email,product_id,quantity_sold) values(?,?,?)',
      [productRequest.sellerEmail, productRequest.id, 0]
    );
    connection.commit();

    // Delete the seller request from the seller_requests table

    res.status(200).send({ message: 'Product approved successfully' });
  } catch (error) {
    console.error('An error occurred while approving product:', error);
    res.status(500).send({ message: 'Server Error' });
  }
};
