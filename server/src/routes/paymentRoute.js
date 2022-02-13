import express from 'express';
import { createStripePayment, successStripePayment } from '../controllers/payments/stripe.js';
import {getPayments} from '../controllers/paymentController.js'
const router = express.Router();
import protect from '../middlewares/authMiddleware.js'; // This import is being used by passport.authenticate method
import passport from 'passport'


import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)


router.post('/stripe/create', createStripePayment);
router.get('/stripe/success/:sessionId', successStripePayment);
router.get('/all', passport.authenticate('jwt', {session: false}), getPayments);


export default router;