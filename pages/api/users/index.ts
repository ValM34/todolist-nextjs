import dbConnect from '@/lib/db-connect';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createUserSchema, updateUserSchema } from '@/lib/zod/user-schema';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  const { method } = req;
  const token = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        if(!jwtSecret || !token) {
          return res.status(401).json({ success: false });
        }
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        if(!decoded) {
          return res.status(401).json({ success: false });
        }
        const user = await User.findById(decoded.userId);
        res.status(200).json({ success: true, data: { firstName: user.firstName, lastName: user.lastName } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
    break;

    case 'POST':
      const validateUser = createUserSchema.parse(req.body);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(validateUser.password, salt);
      const isUserExist = await User.findOne({ email: validateUser.email });
      try {
        if(validateUser.password !== validateUser.confirmPassword) {
          return res.status(401).json({ success: false });
        }
        if (isUserExist) {
          return res.status(401).json({ success: false });
        }
        const user = await User.create({ ...validateUser, password: hashedPassword });
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    
    case 'PUT':
      try {
        if(!jwtSecret || !token) {
          return res.status(401).json({ success: false });
        }
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        if(!decoded) {
          return res.status(401).json({ success: false });
        }
        const validateUser = updateUserSchema.parse(req.body);
        const user = await User.findByIdAndUpdate(decoded.userId, validateUser, {
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
