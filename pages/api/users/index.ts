import dbConnect from '@/lib/db-connect';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createUserSchema, updateUserSchema } from '@/lib/zod/user-schema';
import { userService } from '@/src/services/user.service';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  const { method } = req;
  const token = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET;

  await dbConnect();

  switch (method) {
    case 'GET':
      if(!jwtSecret || !token) {
        return res.status(401).json({ success: false });
      }
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
      if(!decoded) {
        return res.status(401).json({ success: false });
      }
      const user = await userService.get(decoded.userId);
      if(!user) return res.status(404).json({ success: false, message: 'User not found' });
      return res.status(200).json({
        success: true,
        data: {
          firstName: user.firstName,
          lastName: user.lastName
        } 
      });

    case 'POST':
      const validateUser = createUserSchema.parse(req.body);
      if(validateUser.password !== validateUser.confirmPassword) return res.status(401).json({ success: false });
      const salt = await bcrypt.genSalt(10);
      validateUser.password = await bcrypt.hash(validateUser.password, salt);
      const newUser = await userService.create(validateUser);
      if(!newUser) return res.status(401).json({ success: false });
      return res.status(201).json({
        success: true,
        data: {
          firstName: newUser.firstName,
          lastName: newUser.lastName
        } 
      });
    
    case 'PUT':
      if(!jwtSecret || !token) {
        return res.status(401).json({ success: false });
      }
      const decodedToUpdate = jwt.verify(token, jwtSecret) as JwtPayload;
      if(!decodedToUpdate) {//@TODO : Revoir comment je peux gérer les decoded plutôt que de changer le nom de variable
        return res.status(401).json({ success: false });
      }
      const validateUserToUpdate = updateUserSchema.parse(req.body);//@TODO passer en safeParse car il n'est plus dans le try/catch - voir toutes les routes
      const userUpdated = await userService.update(validateUserToUpdate, decodedToUpdate.userId);
      if(!userUpdated) return res.status(400).json({ success: false });
      return res.status(200).json({
        success: true,
        data: {
          firstName: userUpdated.firstName,
          lastName: userUpdated.lastName
        } 
      });

    default:
      res.status(405).json({ success: false });
      break;
  }
}
