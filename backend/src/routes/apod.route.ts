import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.NASA_API_KEY ;
    const { date } = req.query;

    const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${
      date ? `&date=${date}` : ''
    }`;
    const response = await axios.get(nasaUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APOD:', error);
    res.status(500).json({ message: 'Failed to fetch APOD data' });
  }
});

export default router;
