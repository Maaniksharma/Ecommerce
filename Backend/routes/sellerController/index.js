import express from 'express';
import authenticateSeller from './authenticateSeller.js';
import sellerLogin from './loginSeller.js';
import sellerRegister from './signupSeller.js';
import sellerMail from './verifySellerMail.js';
import orderRequest from './FetchOrderRequests.js';
import sellerDispatch from './doSellerDispatch.js';
import sellerProducts from './fetchSellerProducts.js';
import productRequest from './doProductRequest.js';
import { upload } from '../../configs/multerconfig.js/index.js';

const router = express.Router();
const authRouter = express.Router();

// Routes that don't require authentication
router.use('/login', sellerLogin);
router.use('/register', sellerRegister);
router.use('/verifyseller', sellerMail);
// Routes that require authentication
authRouter.post(
  '/productRequest',
  authenticateSeller,
  upload.single('imageFile'),
  productRequest
);
authRouter.use('/orderRequests', authenticateSeller, orderRequest);
authRouter.use('/dispatch', authenticateSeller, sellerDispatch);
authRouter.use('/products', authenticateSeller, sellerProducts);

router.use('/', authRouter);

export default router;
