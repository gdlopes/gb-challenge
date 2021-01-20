import { Router } from 'express';

import ResellerController from '@controllers/ResellerController';
import SessionController from '@controllers/SessionController';
import OrderController from '@controllers/OrderController';
import CashbackController from '@controllers/CashbackController';

const router = Router();

const resellerController = new ResellerController();
const sessionController = new SessionController();
const orderController = new OrderController();
const cashbackController = new CashbackController();

import ensureAuthentication from '@middlewares/ensureAuthentication';

router.post('/resellers', resellerController.create);
router.post('/sessions', sessionController.create);
router.post('/orders', orderController.create);
router.get('/orders', ensureAuthentication, orderController.index);
router.get('/cashback/:document', ensureAuthentication, cashbackController.show);

export default router;