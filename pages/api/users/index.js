import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { method } = req;
  const token = req.headers.authorization;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        res.status(200).json({ success: true, data: { firstName: user.firstName, lastName: user.lastName } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      const { email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const isUserExist = await User.findOne({ email });
      try {
        if (isUserExist) {
          return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const user = await User.create({ ...req.body, password: hashedPassword });
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    
    case 'PUT':
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByIdAndUpdate(decoded.userId, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: { firstName: user.firstName, lastName: user.lastName } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(405).json({ success: false });
      break;
  }
}
