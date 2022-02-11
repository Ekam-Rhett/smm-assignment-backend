import express from 'express';
import { createStripePayment, successStripePayment } from '../controllers/payments/stripe.js';
const router = express.Router();


import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)


router.post('/stripe/create', createStripePayment);
router.get('/stripe/success/:sessionId', successStripePayment);

export default router;