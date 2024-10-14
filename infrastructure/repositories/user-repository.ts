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

export async function update(data: Pick<User, 'id' | 'firstName' | 'lastName'>) {
  try {
    await prisma.user.update({
      where: {
        id: data.id
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
      }
    })
  } catch(e) {
    console.error('An error occurred while updating user:', e);
  }
}
