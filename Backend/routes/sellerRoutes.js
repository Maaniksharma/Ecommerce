import express from 'express';
import authenticateSeller from '../Controllers/sellerController/authenticateSeller.js';
import sellerLogin from '../Controllers/sellerController/loginSeller.js';
import sellerRegister from '../Controllers/sellerController/signupSeller.js';
import sellerMail from '../Controllers/sellerController/verifySellerMail.js';
import orderRequest from '../Controllers/sellerController/FetchOrderRequests.js';
import sellerDispatch from '../Controllers/sellerController/doSellerDispatch.js';
import sellerProducts from '../Controllers/sellerController/fetchSellerProducts.js';
import productRequest from '../Controllers/sellerController/doProductRequest.js';
import { upload } from '../configs/multerconfig.js';

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
