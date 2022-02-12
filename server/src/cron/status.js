import cron from 'cron';
const CronJob = cron.CronJob;
import {checkStatus, getServices} from '../helpers/provider.js'
import Order from '../models/orderModel.js'
import Service from '../models/serviceModel.js'

export const checkBulkStatus = new CronJob('*/20 * * * * *', async function() {
    console.log("Running Cron Task: Checking Order Status'")
    const orders = await Order.find({ $and: [{status: {$ne: "Completed"}}, {status: {$ne: "Canceled"}}, {status: {$ne: "Refunded"}}]});
    console.log(orders)
    for (const order of orders) {
        const status = await checkStatus(order.apiOrderId);
        const findOrder = await Order.findOne({apiOrderId: order.apiOrderId})
        findOrder.cost = status.charge
        findOrder.startCount = status.start_count,
        findOrder.status = status.status,
        findOrder.remains = status.remains
        await findOrder.save();
    }
}, null, true, process.env.TIME_ZONE);


export const updatingServiceActive = new CronJob('*/30 * * * *', async function() {
    console.log("Running Cron Task: Disabling Inactive Services & Enabling active ones");
    const services = await Service.find();
    const providerServieces = await getServices();
    for (let i = 0; i < services.length; i++) {
        let data = providerServieces.filter(data => data.service == services[i].supplierServiceId);
        if (data && services[i].isActive == false) {
            const queryService = await Service.findOne({supplierServiceId: services[i].supplierServiceId});
            queryService.isActive = true;
            await queryService.save();
        } else if (data.length == 0 && services[i].isActive == true) {
            const queryService = await Service.findOne({supplierServiceId: services[i].supplierServiceId});
            queryService.isActive = false;
            await queryService.save();
        }
    }
}, null, true, process.env.TIME_ZONE)

checkBulkStatus.start();
updatingServiceActive.start()




