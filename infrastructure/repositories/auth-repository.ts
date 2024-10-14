"use server";
import {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function authUser(data: Pick<User, 'email' | 'password'>) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });
    if(!user) {
      throw new Error('User not found');
    }
    // const isMatch = await bcrypt.compare(data.password, user.password);
    const isMatch = user.password === data.password;
    if(!isMatch) {
      throw new Error('Invalid password');
    }
    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret || jwtSecret === undefined) throw new Error('JWT secret not found');
    const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
      expiresIn: '1d',
    });
    return { user, token };
  } catch(e) {
    console.error('An error occurred while authenticating user', e);
  }
}
