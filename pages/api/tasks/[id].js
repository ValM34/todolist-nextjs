import dbConnect from '../../../lib/db-connect';
import Todo from '../../../models/task';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    // fetch tasks by project id
    case 'GET':
      console.log(req.query.id)
      try {
        const todo = await Todo.find({ project: req.query.id });
        if (!todo) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: todo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedTodo = await Todo.deleteOne({ _id: id });
        if (!deletedTodo) {
          return res.status(404).json({ success: false });
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
