import dbConnect from '@/lib/db-connect';
import Task from '@/models/task';
import Project from '@/models/project';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { createTaskSchema } from '@/lib/zod/task-schema';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  const { method } = req;
  const token = req.headers.authorization;
  if(!token) return res.status(401).json({ success: false });
  const jwtSecret = process.env.JWT_SECRET;
  if(!jwtSecret || jwtSecret === undefined) return res.status(401).json({ success: false });


  const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
  if(!decoded) return res.status(401).json({ success: false });

  await dbConnect();

  switch (method) {
    case 'POST':
      const validateTask = createTaskSchema.parse({ ...req.body, user: decoded.userId });
      const newTask = await Task.create(validateTask);
      if(!newTask) return res.status(400).json({ success: false });
      return res.status(201).json({ success: true, data: newTask });

    default:
      res.status(405).json({ success: false });
      break;
  }
}
