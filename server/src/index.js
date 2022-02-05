import express from 'express';

const app = express();
const port = Math.floor(Math.random() * 5000);







app.listen(port, () => {
    console.log(`Server successfully running on port ${port}`)
})