import jwt from 'jsonwebtoken';

export default (req, res) => {
  const { password } = req.body;
  // Check if the password matches
  if (password === 'manik123') {
    // Return token if password matches
    const token = jwt.sign(
      { data: 'my name is manik' },
      process.env.secretkey,
      {
        expiresIn: '10m',
      }
    );
    const refreshToken = jwt.sign(
      { data: 'my name is manik' },
      process.env.secretkey,
      {
        expiresIn: '30m',
      }
    );

    return res.json({ token: token, refreshToken: refreshToken });
  } else {
    // Return error if password doesn't match
    return res.json({ err: 1 });
  }
};
