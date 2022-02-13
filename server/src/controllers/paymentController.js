import asyncHandler from 'express-async-handler'
import Payment from '../models/paymentModel.js'







export const getPayments = asyncHandler(async (req, res) => {
    const paymentData = await Payment.find().select("-transcationDetails");
    if (!paymentData) {
        res.status(404)
        throw new Error("Payment data could not be fetched")
    }
    res.status(200).json({
        paymentData
    });
});



