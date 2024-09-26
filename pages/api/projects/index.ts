import dbConnect from '@/lib/db-connect';
import Project from '@/models/project';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { createProjectSchema } from '@/lib/zod/project-schema';
import { ProjectService, projectService } from '@/src/services/project.service';

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
      const projects = await projectService.getProjectsByUserId(decoded.userId);
      if(!projects) return res.status(400).json({ success: false });
      return res.status(200).json({ success: true, data: projects });

    case 'POST':
      const validateProject = createProjectSchema.parse(req.body);
      const project = await projectService.create(validateProject, decoded.userId);
      if(!project) return res.status(400).json({ success: false });
      return res.status(200).json({ success: true, data: project });
      
    default:
      res.status(405).json({ success: false });
      break;
  }
}
