import dbConnect from '@/lib/db-connect';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { updateProjectSchema } from '@/lib/zod/project-schema';
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
      const { id } = req.query;
      if(typeof id !== 'string') return res.status(400).json({ success: false });
      const project = await projectService.getProjectByIdAndUserId(id, decoded.userId);
      if(!project) return res.status(400).json({ success: false });
      return res.status(200).json({ success: true, data: project });

    case 'PUT':
      const validateProject = updateProjectSchema.parse(req.body);
      const projectUpdated = await projectService.update(validateProject, decoded.userId);
      if(!projectUpdated) return res.status(400).json({ success: false });
      return res.status(200).json({ success: true, data: projectUpdated });

    case 'DELETE':
      const success = await projectService.delete(req.body, decoded.userId);
      if(!success) return res.status(400).json({ success: false });
      return res.status(200).json({ success: true });

    default:
      res.status(405).json({ success: false });
      break;
  }
}
