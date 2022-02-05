import express from 'express';
import 'dotenv/config'

import userRoutes from './routes/userRoute.js'

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Successfully running"
    })
})

app.use('/api/auth', userRoutes);





app.listen(port, () => {
    console.log(`Server successfully running on port ${port}`)
})