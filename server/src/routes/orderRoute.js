import express from 'express';
import protect from '../middlewares/authMiddleware.js'; // This import is being used by passport.authenticate method
import passport from 'passport'
const router = express.Router();
import {getOrders} from '../controllers/orderController.js'



router.route('/all').get(passport.authenticate('jwt', {session: false}), getOrders);



export default router;