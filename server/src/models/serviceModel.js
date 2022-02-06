import mongoose, { isValidObjectId } from 'mongoose'


const serviceSchema = mongoose.Schema({
    categoryId: {
        type: isValidObjectId,
        required: true
    },
    name: {
        type: String,
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
})

const Service = mongoose.model("Services", serviceSchema);

export default Service