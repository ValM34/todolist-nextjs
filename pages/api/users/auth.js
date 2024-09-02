import bcrypt from 'bcryptjs';
import User from '../../../models/user';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  const { email, password } = req.body;
  switch (method) {
    case 'POST':
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ success: false });
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });
        res.status(200).json({ success: true, data: { token } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}