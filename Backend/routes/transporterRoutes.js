import express from 'express';
import transporterGet from '../Controllers/transporterController/getTransporterDetails.js';
import transporterDispatch from '../Controllers/transporterController/setDispatch.js';
import transporterDelivered from '../Controllers/transporterController/SetDelivered.js';

const router = express.Router();

router.get('/', transporterGet);
router.get('/dispatch', transporterDispatch);
router.get('/delivered', transporterDelivered);

export default router;
