import mongoose from 'mongoose'


const serviceSchema = mongoose.Schema({
    categoryId: {
        type: Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    supplierServiceId: {
        type: Number,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    retailPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    quality: {
        type: String,
        required: true
    },
    denyLinkDuplicates: {
        type: Boolean,
        required: true,
        default: true
    }
},
{
    timestamps: true
})

const Service = mongoose.model("Services", serviceSchema);

export default Service