import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({
    paymentMethod: {
        type: String,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    memo: {
        type: String,
        required: true
    },
    transcationDetails: { 
        type: Object,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    }
}, {
    timestamps: true
});


const Payment =  mongoose.model('Payment', paymentSchema);

export default Payment;