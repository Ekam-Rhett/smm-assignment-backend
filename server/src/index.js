import express from 'express';
import 'dotenv/config'

import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

const app = express();
connectDB();
const port = process.env.PORT || 5000;
app.use(express.json());



app.get('/', (req, res) => {
    res.status(200).json({
        message: "Successfully running"
    })
})

app.use('/', userRoutes);

app.use(notFound);
app.use(errorHandler);



app.listen(port, () => {
    console.log(`Server successfully running on port ${port}`)
})