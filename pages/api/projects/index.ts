import dbConnect from '@/lib/db-connect';
import Project from '@/models/project';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { createProjectSchema } from '@/lib/zod/project-schema';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  const { method } = req;
  const token = req.headers.authorization;
  if(!token) return res.status(401).json({ success: false });
  const jwtSecret = process.env.JWT_SECRET;
  if(!jwtSecret || jwtSecret === undefined) return res.status(401).json({ success: false });
  const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
  if(!decoded) return res.status(401).json({ success: false });

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
        const validateProject = createProjectSchema.parse(req.body);
        const project = await Project.create({...validateProject, user: decoded.userId});
        res.status(201).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      
    default:
      res.status(405).json({ success: false });
      break;
  }
}
