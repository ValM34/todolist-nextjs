import dbConnect from '../../../lib/db-connect';
import Project from '../../../models/project';
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
    case 'GET':
      try {
        const projects = await Project.find({ user: decoded.userId });
        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        const project = await Project.create({...req.body, user: decoded.userId});
        res.status(201).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      
    case 'DELETE':
      try {
        const project = await Project.findById(req.body);
        if (project.user != decoded.userId) {
          return res.status(400).json({ success: false });
        }
        const projectDeleted = await Project.findOneAndDelete(req.body);
        res.status(200).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
