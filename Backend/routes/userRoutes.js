import express from 'express';
import loginPost from '../Controllers/userController/UserLogin.js';
import signupPost from '../Controllers/userController/userSignup.js';
import order from '../Controllers/userController/doOrder.js';
import verifyMail from '../Controllers/userController/verifyUserMail.js';
import cartGet from '../Controllers/userController/cartGet.js';
import CartItemAdd from '../Controllers/userController/cartItemAdd.js';
import CartItemDelete from '../Controllers/userController/cartItemDelete.js';
import EditUser from '../Controllers/userController/EditUser.js';
import orders from '../Controllers/userController/fetchOrders.js';
import cartClear from '../Controllers/userController/cartClear.js';
import authenticateUser from '../Controllers/userController/authenticateUser.js';

const router = express.Router();

router.post('/login', loginPost);
router.post('/signup', signupPost);
router.get('/verify', verifyMail);
router.get('/cartget', authenticateUser, cartGet);
router.get('/cartitemadd', authenticateUser, CartItemAdd);
router.get('/cartitemdelete', authenticateUser, CartItemDelete);
router.post('/edituser', authenticateUser, EditUser);
router.get('/orders', authenticateUser, orders);
router.get('/cartclear', authenticateUser, cartClear);
router.post('/order', authenticateUser, order);
export default router;
