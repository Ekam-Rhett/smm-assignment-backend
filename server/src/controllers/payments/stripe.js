import asyncHandler from 'express-async-handler'
import Stripe from 'stripe';
import Service from '../../models/serviceModel.js'
import Payment from '../../models/paymentModel.js'
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)

export const createStripePayment = asyncHandler(async (req, res) => {

        const {serviceId, customerEmail} = req.body

        if (!serviceId) throw new Error('serviceId is required');
        const lineItem = await Service.findOne({_id: serviceId});
        if (!lineItem) throw new Error('Invalid serviceId provided');
 
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    name: lineItem.name,
                    quantity: 1,
                    currency: 'usd',
                    amount: lineItem.retailPrice * 100,

                }
            ],
            customer_email: customerEmail,
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`
        });


        const paymentLog = await Payment.create({
            orderId: "NA",
            paymentMethod: "stripe",
            amountPaid: stripeSession.amount_total / 100,
            fee: ((stripeSession.amount_total / 100) * 0.029) + 0.30,
            customerEmail,
            memo: stripeSession.id,
            transcationDetails: stripeSession
        });

        if (!paymentLog) throw new Error("Payment data could not be saved");

        res.status(200).json({
            url: stripeSession.url
        });
 
})