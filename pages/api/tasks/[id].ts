import dbConnect from '@/lib/db-connect';
import Task from '@/models/task';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { updateTaskSchema } from '@/lib/zod/task-schema';
import { taskService } from '@/src/services/task.service';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  const { method } = req;
  const { id } = req.query;
  const token = req.headers.authorization;
  if(!token) return res.status(401).json({ success: false });
  const jwtSecret = process.env.JWT_SECRET;
  if(!jwtSecret || jwtSecret === undefined) return res.status(401).json({ success: false });
  const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
  if(!decoded) {
    return res.status(401).json({ success: false });
  }

  await dbConnect();

  switch (method) {
    case 'GET':
      if(typeof id !== 'string') return res.status(400).json({ success: false });
      const task = await taskService.getTaskByIdAndUserId(id, decoded.userId);
      if(!task) return res.status(404).json({ success: false, message: 'Task not found' });
      return res.status(200).json({ success: true, data: task });

    case 'PUT':
      const validateTask = updateTaskSchema.parse({ ...req.body, user: decoded.userId });
      const taskUpdated = await taskService.update(validateTask, decoded.userId);
      if(!taskUpdated) return res.status(404).json({ success: false, message: 'Task not found' });
      return res.status(200).json({ success: true, data: taskUpdated });

    case 'DELETE':
      if(typeof id !== 'string') return res.status(400).json({ success: false });
      const success = await taskService.delete(id, decoded.userId);
      if(!success) return res.status(404).json({ success: false, message: 'Task not found' });
      return res.status(200).json({ success: true, data: {} });

    default:
      res.status(405).json({ success: false });
      break;
  }
}
