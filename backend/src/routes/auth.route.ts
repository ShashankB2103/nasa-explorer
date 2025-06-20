import { Router, Request, Response } from 'express';
import User from '../models/user.model';
import { requireAuth, AuthRequest } from '../middleware/authMiddleware';
import jwt from 'jsonwebtoken';

const authRouter = Router();

// POST /api/auth/register
const handleRegister = async (req: Request, res: Response): Promise<any> => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

authRouter.post('/register', handleRegister);


// POST /api/auth/login
const handleLogin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
};

authRouter.post('/login', handleLogin);
authRouter.get('/profile', requireAuth, async (req: AuthRequest, res: Response) => {
  res.json({
    message: 'Protected route accessed ✅',
    userId: req.userId,
  });
});

export default authRouter;
