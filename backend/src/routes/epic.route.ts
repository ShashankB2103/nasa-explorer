import { Router, Request, Response } from 'express';
import axios from 'axios';

const epicRouter = Router();

interface EpicImage {
  identifier: string;
  caption: string;
  image: string;
  date: string;
  centroid_coordinates: { lat: number; lon: number };
  dscovr_j2000_position: { x: number; y: number; z: number };
  lunar_j2000_position: { x: number; y: number; z: number };
  sun_j2000_position: { x: number; y: number; z: number };
  attitude_quaternions: { q0: number; q1: number; q2: number; q3: number };
}

epicRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const apiKey = process.env.NASA_API_KEY;
    const metaUrl = `https://api.nasa.gov/EPIC/api/natural?api_key=${apiKey}`;
    const response = await axios.get(metaUrl);

    const formatted = (response.data as EpicImage[]).map((img) => {
      const datePart = img.date.split(' ')[0].replace(/-/g, '/');
      const imgUrl = `https://epic.gsfc.nasa.gov/archive/natural/${datePart}/jpg/${img.image}.jpg`;
      return {
        ...img,
        imgUrl,
      };
    });

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching EPIC data:', error);
    res.status(500).json({ message: 'Failed to fetch EPIC data' });
  }
});

export default epicRouter;
