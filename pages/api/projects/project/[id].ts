import dbConnect from '@/lib/db-connect';
import Project from '@/models/project';
import Task from '@/models/task';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { updateProjectSchema } from '@/lib/zod/project-schema';
import mongoose from 'mongoose';

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
        const project = await Project.find({ _id: req.query.id, user: decoded.userId });
        res.status(200).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      const validateProject = updateProjectSchema.parse(req.body);
      try {
        const project = await Project.findOneAndUpdate({ _id: validateProject._id, user: decoded.userId }, validateProject, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      const session = await mongoose.startSession();
      try {
        await session.withTransaction(async () => {
          await Task.deleteMany({
            project: req.body,
            user: decoded.userId
          }, { session });
          await Project.findOneAndDelete({
            _id: req.body,
            user: decoded.userId
          }, { session });
        });
        await session.commitTransaction();
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      } finally {
        await session.endSession();
      }
      break;

    default:
      res.status(405).json({ success: false });
      break;
  }
}
