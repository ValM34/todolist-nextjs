import dbConnect from '@/lib/db-connect';
import Task from '@/models/task';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { taskService } from '@/src/services/task.service';

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
    // fetch tasks by project id
    case 'GET':
      if(typeof req.query.id !== 'string') return res.status(400).json({ success: false });
      const tasks = await taskService.getTasksByProjectIdAndUserId(req.query.id, decoded.userId);
      if(!tasks) return res.status(404).json({ success: false, message: 'Tasks not found' });
      return res.status(200).json({ success: true, data: tasks });

    default:
      res.status(405).json({ success: false });
      break;
  }
}
