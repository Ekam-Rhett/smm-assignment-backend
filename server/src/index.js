import 'dotenv/config'
import express from 'express';
import nodemailer from 'nodemailer'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js'
import ticketRoutes from './routes/tickets.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import path from 'path';

const app = express();
connectDB();
const port = process.env.PORT || 5000;
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'frontend', 'src', 'app.jsx'))
})

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Successfully running"
    })
})

//data parsings
app.use(express.urlencoded({ 
    extended: false
}));
app.use(express.json());

app.post('/email', (req, res) => {
    // msg
    // todo
    console.log('Data ', req.body);
    res.json({ message: 'message recieved'})
});

// admin
app.use('/api/admin', userRoutes);

// ticket route api?
app.use('/api/ticket', ticketRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server successfully running on port ${port}`)
})