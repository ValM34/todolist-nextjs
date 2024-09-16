import bcrypt from 'bcryptjs';
import User from '@/models/user';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db-connect';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  await dbConnect();
  const { method } = req;
  const { email, password } = req.body;
  const jwtSecret = process.env.JWT_SECRET;
  if(!jwtSecret || jwtSecret === undefined) return res.status(400).json({ success: false });

  switch (method) {
    case 'POST':
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ success: false });
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, {
          expiresIn: '1d',
        });

        res.setHeader(
          'Set-Cookie',
          `token=${token}; Max-Age=3600 * 24; Path=/; HttpOnly; Secure; SameSite=Strict`
        );

        res.status(200).json({ success: true, data: { token } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}