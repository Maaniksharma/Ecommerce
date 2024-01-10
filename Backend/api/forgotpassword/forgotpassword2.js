// forgotpassword2.js

export default (req, res) => {
  res.render('resetpassword', { token: req.query.token });
};
