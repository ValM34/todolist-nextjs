import dbConnect from '@/lib/db-connect';
import Task from '@/models/task';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if(!decoded) {
    return res.status(400).json({ success: false, message: 'Invalid token' });
  }

  await dbConnect();

  switch (method) {
    // fetch tasks by project id
    case 'GET':
      try {
        const tasks = await Task.find({ project: req.query.id, user: decoded.userId });
        if (!tasks) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: tasks });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(405).json({ success: false });
      break;
  }
}
