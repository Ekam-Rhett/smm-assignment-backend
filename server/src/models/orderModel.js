import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    orderId: {
        type: Number,
        required: true
    },
    apiOrderId: {
        type: Number,
        required: true
    },
    serviceId: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    startCount: {
        type: Number,
        required: false,
        defualt: "null"
    },
    remains: {
        type: Number,
        required: true,
        defualt: "null"
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    paymentId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});




const Order = mongoose.model("Orders", orderSchema);

export default Order;