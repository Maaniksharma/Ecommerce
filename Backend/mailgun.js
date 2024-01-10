import formData from 'form-data';
import Mailgun from 'mailgun.js';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere',
});
export default (email, Link, title, callback) => {
  mg.messages
    .create('sandbox8d932839ddb14f478f5e5900775c1099.mailgun.org', {
      from: 'Apni Dukkan manikss123456@gmail.com',
      to: [email],
      subject: title,
      html: `<h1>${title}</h1>
              <p>Click on the link below</p>
              <a href=${Link}>Click Here</a>`,
    })
    .then((msg) => {
      console.log(msg);
      callback(null, msg);
    }) // logs response data
    .catch((err) => {
      console.log(err);
      callback(err, null);
    }); // logs any error
};
