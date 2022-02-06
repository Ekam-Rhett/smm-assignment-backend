import 'dotenv/config';
const router = require('express').Router();

// Project Model
const Ticket = require('../models/ticketModel');

// index (get all tickets)
router.route('/').get((req, res) => {
	Ticket.find()
		.then(tickets => res.json(tickets))
		.catch(err => res.status(400).json('Error: ' + err));
});

// CREATE
router.route('/create').post((req, res) => { 
	const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const status = req.body.status;
    const history = req.body.history;

    const newTicket = new Ticket({
    	id,
    	name,
    	email,
    	status,
    	history,
    });

    newTicket.save()
     	.then(() => res.json('Ticket successfully created.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// READ
router.route('/:id').get((req,res) => {
    Ticket.findById(req.params.id)
        .then(ticket => res.json(ticket))
        .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE
router.route('/update/:id').post((req,res) => {
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

// DELETE
router.route('/:id').delete((req,res) => {
    Ticket.findByIdAndDelete(req.params.id)
        .then(ticket => res.json('Ticket deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// REPLY
router.route('/reply/:id').post((req,res) => {
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.S3_BUCKET,
        pass: process.env.SECRET_KEY,
    },
    tls: {
        rejectUnauthorized: false,
    }
});

let mailOptions = {
    from: process.env.S3_BUCKET,
    to: "email@gmail.com",
    subjext: "hello",
    text: "hello",
}

transporter.sendMail(mailOptions, function(err, success){
    if (err) {
        console.log(err)
    }
    else {
        console.log("email sent successfully")
    }
});

export default router