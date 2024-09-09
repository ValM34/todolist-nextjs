import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      const token = req.headers.authorization;
      const secret = process.env.JWT_SECRET;

      if(!secret){
        return res.status(400).json({ success: false, message: 'JWT_SECRET is not defined' });
      }

      try {
        const decoded = jwt.verify(token, secret);
        res.status(200).json({ success: true, user: decoded });
      } catch (error) {
        return res.status(400).json({ success: false, message: 'Invalid token' });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
}