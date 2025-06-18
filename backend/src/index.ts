import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apodRoute from './routes/apod.route';
import marsRouter from './routes/mars.route';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/apod', apodRoute);
app.use('/api/mars', marsRouter);


app.get('/', (_req, res) => {
  res.send('NASA Explorer Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
