import dbConnect from '@/lib/db-connect';
import Task from '@/models/task';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { updateTaskSchema } from '@/lib/zod/task-schema';

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
      try {
        const task = await Task.find({ _id: id, user: decoded.userId });
        if (!task) {
          return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const validateTask = updateTaskSchema.parse({ ...req.body, user: decoded.userId });
        const task = await Task.findOneAndUpdate({_id: validateTask._id, user: validateTask.user }, req.body, {
          new: true,
          runValidators: true,
        });
        if (!task) {
          return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedTask = await Task.deleteOne({ _id: id, user: decoded.userId });
        if (!deletedTask) {
          return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(405).json({ success: false });
      break;
  }
}