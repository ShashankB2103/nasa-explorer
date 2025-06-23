import { Router, Request, Response } from 'express';
import axios from 'axios';

const neoRouter = Router();

// Route: GET /api/neo?start=YYYY-MM-DD&end=YYYY-MM-DD
// Default: today’s date only
neoRouter.get('/', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.NASA_API_KEY;
    const { start, end } = req.query;

    // Default to today if no date range is provided
    const today = new Date().toISOString().split('T')[0];
    const startDate = start || today;
    const endDate = end || today;

    // Call NASA NeoWs API
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
    const response = await axios.get(url);

    // Return only the near_earth_objects dictionary
    res.json(response.data.near_earth_objects);
  } catch (error) {
    console.error('Error fetching NEO data:', error);
    res.status(500).json({ message: 'Failed to fetch NEO data' });
  }
});

export default neoRouter;
