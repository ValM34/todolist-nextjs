import dbConnect from '@/lib/db-connect';
import Task from '@/models/task';
import User from '../../../models/user';
import Project from '@/models/project';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { method } = req;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if(!decoded) {
    return res.status(400).json({ success: false, message: 'Invalid token' });
  }

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const project = await Project.find({_id: req.body.project, user: decoded.userId});
        if (!project || project.length === 0) {
          return res.status(404).json({ success: false, message: 'Projet non trouvé' });
        }
        const taskObject = { ...req.body, user: decoded.userId };
        const task = await Task.create(taskObject);
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
