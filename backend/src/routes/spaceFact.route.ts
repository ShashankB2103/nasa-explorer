// src/routes/spaceFact.route.ts
import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: 'Give me one fun and educational fact about space or astronomy in less than 50 words.',
          },
        ],
        temperature: 0.7,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const fact = response.data.choices[0].message.content.trim();
    res.json({ fact });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ message: 'Failed to generate space fact' });
  }
});

export default router;
