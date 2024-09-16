import dbConnect from '@/lib/db-connect';
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
    case 'GET':
      try {
        const project = await Project.find({ _id: req.query.id, user: decoded.userId });
        res.status(200).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      console.log(req.body._id);
      console.log(decoded.userId);
      try {
        const project = await Project.findOneAndUpdate({ _id: req.body._id, user: decoded.userId }, req.body, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const projectDeleted = await Project.findOneAndDelete({
          _id: req.body,
          user: decoded.userId
        });
        res.status(200).json({ success: true, data: projectDeleted });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}