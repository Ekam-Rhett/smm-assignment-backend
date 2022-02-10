import express from 'express';
import { createStripePayment, verifyStripePayment, successStripePayment } from '../controllers/payments/stripe.js';
const router = express.Router();


import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)


router.post('/stripe/create', createStripePayment);
router.post('/stripe/verify', verifyStripePayment);
router.post('/stripe/success/:sessionId', successStripePayment);

export default router;