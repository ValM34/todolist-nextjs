"use server";
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(data: Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>) {
  try {
    await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }
    });
  } catch (e) {
    console.error('An error occurred while creating user:', e);
    throw e;
  }
}