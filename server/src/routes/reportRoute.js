import express from 'express';



router.post('/profit/:year', createStripePayment);
// router.get('/revenue/:year', successStripePayment);
// router.get('/orders/:year', successStripePayment);

export default router;