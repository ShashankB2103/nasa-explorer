import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToMongoDB } from './config/db'; // if you're connecting DB separately
import apodRouter from './routes/apod.route';
import marsRouter from './routes/mars.route';
import neoRouter from './routes/neo.route';
import epicRouter from './routes/epic.route';
import libraryRouter from './routes/library.route';
import authRouter from './routes/auth.route';
import spaceFactRouter from './routes/spaceFact.route';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/apod', apodRouter);
app.use('/api/mars', marsRouter);
app.use('/api/neo', neoRouter);
app.use('/api/epic', epicRouter);
app.use('/api/library', libraryRouter);
app.use('/api/auth', authRouter);
app.use('/api/space-fact', spaceFactRouter);

export default app;
