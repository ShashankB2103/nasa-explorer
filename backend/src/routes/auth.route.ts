import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { requireAuth, AuthRequest } from '../middleware/authMiddleware';

const authRouter = Router();

// POST /api/auth/register
const handleRegister = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

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
const handleLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
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

// GET /api/auth/profile - Protected route
authRouter.get('/profile', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      message: 'Protected route accessed',
      userId: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

export default authRouter;