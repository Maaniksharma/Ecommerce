import jwt from 'jsonwebtoken';
export default async function authenticateAdmin(req, res, next) {
  try {
    const token = req.headers.authorization;
    await jwt.verify(token, process.env.secretkey);
    next(); // Continue to next middleware or route handler
  } catch (error) {
    console.error('Failed to authenticate:', error);
    res.status(401).json({ err: 'Unauthorized' });
  }
}
