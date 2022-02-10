import express from 'express';
import { createStripePayment, verifyStripePayment } from '../controllers/payments/stripe.js';
const router = express.Router();



router.post('/stripe/create', createStripePayment)
router.post('/stripe/verify', verifyStripePayment)

export default router;