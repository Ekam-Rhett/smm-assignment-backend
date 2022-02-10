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
                link, 
                serviceId,
                customerEmail
            },
            customer_email: customerEmail,
            success_url: `${process.env.CLIENT_URL}/api/payment/stripe/success/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`
        });


        

        res.status(200).json({
            url: stripeSession.url
        });
 
});




export const verifyStripePayment = async(req, res) => {
    let charge;
    const event = req.body


    
    response.status(200).json({received: true});

}


export const successStripePayment = async(req, res) => {
    const stripeToken = req.params.sessionId
    if (!stripeToken) throw new Error("Stripe token not provided")
    const session = await stripe.checkout.sessions.retrieve(stripeToken);
    if (!session) throw new Error("Invaliad Stripe session")

    // if (session.payment)
    // const paymentLog = await Payment.create({
    //   orderId: Math.floor(Math.random() * 1000000000),
    //   paymentMethod: "stripe",
    //   amountPaid: session.amount_total / 100,
    //   fee: ((session.amount_total / 100) * 0.029) + 0.30,
    //   customerEmail: null,
    //   memo: null,
    //   transcationDetails: null,
    //   status: "compeleted"
    // });

    // if (!paymentLog) throw new Error("Payment data could not be saved");
    // console.log(event)

      res.status(200).json({
        session
      })
}

























