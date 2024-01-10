import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';

//mongodb connect
import dotenv from 'dotenv';
dotenv.config();

//middlewares
import Session from './middlewares/Session.js';
// main.js
import sellerRoutes from './routes/sellerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import transporterRoutes from './routes/transporterRoutes.js';
import TokenRefresh from './api/tokenRefresh.js';

import homeGet from './Controllers/homeController/get.js';

//api

import productApi from './api/products.js';
import productDetailsApi from './api/details/products.js';

const app = express();

//Sql Connection

console.log('connection created to mysql');
app.use('/uploads', express.static('D:/my programs/Ecommerce/uploads'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(Session));
app.use(cors());
app.use('/seller', sellerRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/transporter', transporterRoutes);
app.get('/home', homeGet);
app.post('/tokenrefresh', TokenRefresh);
app.get('/api/products', productApi);
app.get('/api/details/  product', productDetailsApi);

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logged out');
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
