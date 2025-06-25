import { Router, Request, Response } from 'express';
import axios from 'axios';

const neoRouter = Router();

// GET /api/neo?start=YYYY-MM-DD&end=YYYY-MM-DD
neoRouter.get('/', async (req: Request, res: Response) => {
  const apiKey = process.env.NASA_API_KEY;
  const { start, end } = req.query;

  try {
    // Default to today's date
    const today = new Date().toISOString().split('T')[0];
    const startDate = typeof start === 'string' ? start : today;
    const endDate = typeof end === 'string' ? end : startDate;

    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
    const response = await axios.get(url);

    const neoObjects = response.data?.near_earth_objects || {};

    res.status(200).json(neoObjects);
  } catch (error: any) {
    console.error('Error fetching NEO data:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch NEO data' });
  }
});

export default neoRouter;
