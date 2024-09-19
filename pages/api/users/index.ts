import dbConnect from '@/lib/db-connect';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  const { method } = req;
  const token = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        if(!jwtSecret || !token) {
          return res.status(400).json({ success: false, message: 'Unauthorized action' });
        }
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        if(!decoded) {
          return res.status(400).json({ success: false, message: 'Invalid token' });
        }
        const user = await User.findById(decoded.userId);
        res.status(200).json({ success: true, data: { firstName: user.firstName, lastName: user.lastName } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
    break;

    case 'POST':
      const { email, password, confirmPassword } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const isUserExist = await User.findOne({ email });
      try {
        if(password !== confirmPassword) {
          return res.status(400).json({ success: false, message: 'Password and confirm password must be the same' });
        }
        if (isUserExist) {
          return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const user = await User.create({ ...req.body, password: hashedPassword });
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    
    case 'PUT':
      try {
        if(!jwtSecret || !token) {
          return res.status(400).json({ success: false, message: 'Unauthorized action' });
        }
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        if(!decoded) {
          return res.status(400).json({ success: false, message: 'Invalid token' });
        }
        const user = await User.findByIdAndUpdate(decoded.userId, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: { firstName: user.firstName, lastName: user.lastName } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(405).json({ success: false });
      break;
  }
}
