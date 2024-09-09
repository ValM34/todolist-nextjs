import dbConnect from '../../../../lib/dbConnect';
import Task from '../../../../models/task';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const task = await Task.findById(id);
        if (!task) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const task = await Task.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!task) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
}