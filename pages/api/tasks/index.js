import dbConnect from '../../../lib/db-connect';
import Todo from '../../../models/task';
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
    // case 'GET':
    //   try {
    //     const todos = await Todo.find({});
    //     res.status(200).json({ success: true, data: todos });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;

    case 'POST':
      try {
        const todo = await Todo.create(req.body);
        res.status(201).json({ success: true, data: todo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(405).json({ success: false });
      break;
  }
}
