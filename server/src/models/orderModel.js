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
        type: Number,
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
        required: true,
        defualt: null
    },
    remains: {
        type: Number,
        required: true,
        defualt: null
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


orderSchema.pre('save', async function() {
    this._id = await userSchema.count;
});


const Order = mongoose.model("Orders", orderSchema);

export default Order;