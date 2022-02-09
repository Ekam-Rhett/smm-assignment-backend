import asyncHandler from 'express-async-handler'
import Ticket from '../models/ticketModel.js'

const createTicket = asyncHandler (async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const status = req.body.status;
    const history = req.body.history;

    const newTicket = new Ticket({
    	name,
    	email,
    	status,
    	history,
    });

    newTicket.save()
     	.then(() => res.json('Ticket successfully created.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

const readTicket = asyncHandler (async (req, res) => {
    Ticket.findById(req.params.id)
        .then(ticket => res.json(ticket))
        .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE
const updateTicket = asyncHandler (async (req, res) => {
    Ticket.findById(req.params.id)
        .then(ticket => {
	    	ticket.id = req.body.id;
	    	ticket.name = req.body.name;
	    	ticket.email = req.body.email;
            ticket.status = req.body.status;
	    	ticket.history = req.body.history;

            ticket.save()
                .then(() => res.json('Ticket updated'))
                .catch(err => res.status(400).json('Error: ' + err));
    	})
        .catch(err => res.status(400).json('Error: ' + err));
});


const deleteTicket = asyncHandler (async (req, res) => {
    Ticket.findByIdAndDelete(req.params.id)
        .then(ticket => res.json('Ticket deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

export {createTicket, readTicket, updateTicket, deleteTicket};