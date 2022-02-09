import express from 'express';
import 'dotenv/config';
const router = express.Router();
import {createTicket, readTicket, updateTicket, deleteTicket} from '../controllers/ticketController.js'


// CREATE
router.route('/create').post(createTicket);

// READ
router.route('/:id').get(readTicket);

// UPDATE
router.route('/update/:id').post(updateTicket);

// DELETE
router.route('/:id').delete(deleteTicket);

export default router