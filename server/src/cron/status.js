import cron from 'cron';
const CronJob = cron.CronJob;
import {checkStatus} from '../helpers/provider.js'
import Order from '../models/orderModel.js'

export const checkBulkStatus = new CronJob('*/20 * * * *', async function() {
    console.log("Running Cron Task: Checking Order Status'")
    const orders = await Order.find({ status: {$ne: "Compeleted"}});
    for (const order of orders) {
        const status = await checkStatus(order.apiOrderId);
        const findOrder = await Order.findOne({apiOrderId: order.apiOrderId})
        findOrder.cost = status.charge
        findOrder.startCount = status.start_count,
        findOrder.status = status.status,
        findOrder.remains = status.remains
        const updatedOrder = await findOrder.save();
    }
}, null, true, process.env.TIME_ZONE);







