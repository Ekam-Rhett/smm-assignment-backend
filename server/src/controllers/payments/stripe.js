import asyncHandler from 'express-async-handler'
import Stripe from 'stripe';
import Service from '../../models/serviceModel.js'
import Payment from '../../models/paymentModel.js'
import { response } from 'express';
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)

export const createStripePayment = asyncHandler(async (req, res) => {

        const {link, serviceId, customerEmail} = req.body
        if (!serviceId) throw new Error('serviceId is required');
        const lineItem = await Service.findById(serviceId)
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
                    description: link

                }
            ],
            metadata: {
                serviceId,
                link,
                customerEmail
            },
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
            transcationDetails: stripeSession,
            status: stripeSession.payment_status
        });

        if (!paymentLog) throw new Error("Payment data could not be saved");

        res.status(200).json({
            url: stripeSession.url
        });
 
});


export const verifyStripePayment = async (req, res) => {
    const endpointSecret = "whsec_eacff9d58922bd1f610eda69b9c861e5c187287f1fccda210fbe7ac9b81d8b27";
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        throw new Error(err.message)
    }

    response.send()
}