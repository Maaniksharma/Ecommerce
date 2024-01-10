import express from 'express';
import adminLogin from '../Controllers/adminContoller/loginAdmin.js';
import requests from '../Controllers/adminContoller/ProvideRequests.js';
import sellerApproval from '../Controllers/adminContoller/ApproveSeller.js';
import productApproval from '../Controllers/adminContoller/ApproveProduct.js';
import productDeny from '../Controllers/adminContoller/DenyProduct.js';
import authenticateAdmin from '../Controllers/adminContoller/authenticateAdmin.js';
import sellerDeny from '../Controllers/adminContoller/DenySeller.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/requests', authenticateAdmin, requests);
router.post('/sellerApproval', authenticateAdmin, sellerApproval);
router.post('/productApproval', authenticateAdmin, productApproval);
router.post('/productdeny', authenticateAdmin, productDeny);
router.post('/sellerdeny', authenticateAdmin, sellerDeny);

export default router;
