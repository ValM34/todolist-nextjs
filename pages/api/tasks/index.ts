import dbConnect from '@/lib/db-connect';
import Task from '@/models/task';
import Project from '@/models/project';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { createTaskSchema } from '@/lib/zod/task-schema';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  const { method } = req;
  const token = req.headers.authorization;
  if(!token) return res.status(400).json({ success: false });
  const jwtSecret = process.env.JWT_SECRET;
  if(!jwtSecret || jwtSecret === undefined) return res.status(400).json({ success: false });
  const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
  if(!decoded) {
    return res.status(400).json({ success: false, message: 'Invalid token' });
  }

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const validateTask = createTaskSchema.parse({ ...req.body, user: decoded.userId });
        const project = await Project.find({_id: validateTask.project, user: decoded.userId});
        if (!project || project.length === 0) {
          return res.status(404).json({ success: false, message: 'Projet non trouvé' });
        }
        const task = await Task.create(validateTask);
        res.status(201).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(405).json({ success: false });
      break;
  }
}
