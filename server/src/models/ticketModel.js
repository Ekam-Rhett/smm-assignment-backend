import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Create Schema
const ticketSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true },
    history: { type: String, required: true },
}, {
    timestamps: true,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;