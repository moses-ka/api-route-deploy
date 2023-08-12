import express from 'express';
import dotenv from 'dotenv';
import router from './routes/usersRouter.js';
import mongoose from 'mongoose';
const app = express();

const port = process.env.PORT || 3008;
app.use(express.json());
mongoose
    .connect('mongodb+srv://moses:ZfDceWc2nIFiVzeh@users.3oz1zus.mongodb.net/?retryWrites=true&w=majority')
    try {
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})