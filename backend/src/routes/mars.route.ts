import { Router, Request, Response } from 'express';
import axios from 'axios';

const marsRouter = Router();

marsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.NASA_API_KEY;
    const { rover = 'curiosity', sol = '1000', camera } = req.query;

    // Construct the base NASA API URL
    let nasaUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${apiKey}`;

    // Add camera filter if provided
    if (camera) {
      nasaUrl += `&camera=${camera}`;
    }

    const response = await axios.get(nasaUrl);
    res.json(response.data.photos);
  } catch (error) {
    console.error('Error fetching Mars Rover photos:', error);
    res.status(500).json({ message: 'Failed to fetch Mars Rover photos' });
  }
});

export default marsRouter;
