import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

export const createOrder = asyncHandler(async (orderData) => {
    const amountOfOrders = await Order.countDocuments()


    const newOrder = await Order.create({
        orderId: amountOfOrders + 1,
        apiOrderId: orderData.apiOrderId,
        serviceId: orderData.serviceId,
        link: orderData.link,
        cost: orderData.cost,
        startCount: orderData.startCount,
        remains: orderData.remains,
        status: orderData.status,
        paymentId: orderData.paymentId
    });

    if (!newOrder) throw new Error("Order data could not be saved")

    return {
        newOrder
    }

});