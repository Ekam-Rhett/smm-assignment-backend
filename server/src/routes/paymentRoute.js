import express from 'express';
import { createStripePayment } from '../controllers/payments/stripe.js';
const router = express.Router();



router.post('/stripe/create', createStripePayment)

export default router;