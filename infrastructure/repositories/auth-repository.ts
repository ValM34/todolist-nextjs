"use server";
import {PrismaClient} from '@prisma/client';

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
    const { id, firstName, lastName, email } = user;
    return { id, firstName, lastName, email };
  } catch(e) {
    console.error('An error occurred while authenticating user', e);
  }
}