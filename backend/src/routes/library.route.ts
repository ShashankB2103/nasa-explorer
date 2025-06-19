import { Router, Request, Response } from 'express';
import axios from 'axios';

const libraryRouter = Router();

/**
 * Handler for NASA Image and Video Library search
 */
const handleLibrarySearch = async (req: Request, res: Response): Promise<void> => {
  const query = req.query.search as string;

  if (!query) {
    res.status(400).json({ message: 'Missing search query' });
    return;
  }

  try {
    // NASA image search API (only image results for now)
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;
    const response = await axios.get(url);

    // Extract and simplify results
    const items = response.data.collection.items.map((item: any) => {
      const data = item.data[0];
      const links = item.links?.[0];

      return {
        title: data.title,
        description: data.description,
        date_created: data.date_created,
        imageUrl: links?.href || '',
      };
    });

    // Return only first 20 items
    res.json(items.slice(0, 20));
  } catch (error) {
    console.error('Library search failed:', error);
    res.status(500).json({ message: 'Failed to fetch NASA library data' });
  }
};

// Register the GET route with the handler
libraryRouter.get('/', handleLibrarySearch);

export default libraryRouter;
