import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js'
import categoryRoutes from './routes/categoryRoute.js'
import serviceRoutes from './routes/serviceRoute.js'
import paymentRoutes from './routes/paymentRoute.js'
import orderRoutes from './routes/orderRoute.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import {checkBulkStatus} from './cron/status.js'

const app = express();
connectDB();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
    origin: '*'
}));
// app.options('http://localhost:3000/', cors())

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Successfully running"
    })
})



app.use('/api/admin', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/calculate', paymentRoutes);
app.use('/api/order', orderRoutes);

app.use(notFound);
app.use(errorHandler);



app.listen(port, () => {
    console.log(`Server successfully running on port ${port}`)
});







