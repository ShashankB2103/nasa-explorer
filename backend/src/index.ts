import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToMongoDB } from './config/db';
import authRouter from './routes/auth.route';
import apodRoute from './routes/apod.route';
import marsRouter from './routes/mars.route';
import neoRouter from './routes/neo.route';
import epicRouter from './routes/epic.route';
import libraryRouter from './routes/library.route';



dotenv.config();
connectToMongoDB(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/apod', apodRoute);
app.use('/api/mars', marsRouter);
app.use('/api/neo', neoRouter);
app.use('/api/epic', epicRouter);
app.use('/api/library', libraryRouter);
app.use('/api/auth', authRouter);




app.get('/', (_req, res) => {
  res.send('NASA Explorer Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
