import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import * as dotenv from 'dotenv';
import { authRouter } from './routes/authRouter.js';
import { packageAdmin } from './routes/packageAdmin.js';
import { viewPackagesRouter } from './routes/viewPackagesRouter.js';
import { bookPackagesRouter } from './routes/bookPackagesRouter.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(Cors());

const port = 5000 || process.env.PORT;

app.get('/test' , (req , res) => {
    console.log(req);
    return res.status(200).send('Server Started !!! This is a Text Link !!!');
});

app.use('/' , authRouter);
app.use('/' , packageAdmin);
app.use('/' , viewPackagesRouter);
app.use('/' , bookPackagesRouter);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('App Connected to MongoDB');
        app.listen(port, () => {
            console.log(`App is listening to Port : ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });