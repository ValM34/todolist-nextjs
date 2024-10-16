"use server";
import {PrismaClient} from '@prisma/client';
import { getTokenByCookiesAndDecode } from '@/utils/get-owner-id';

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
    throw new Error('An error occurred while creating user...');
  }
}

export async function getUserByEmail(): Promise<Pick<User, 'firstName' | 'lastName'> | undefined> {
  const owner = await getTokenByCookiesAndDecode();
  if(!owner) throw new Error();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: owner.email as string,//@TODO question : pourquoi as string enlève l'erreur typescript
      },
    });
    if(!user) {
      throw new Error('An error occurred while finding user...');
    }
    console.log(user)
    return { firstName: user.firstName, lastName: user.lastName };
  } catch(e) {
    throw new Error('An error occurred while finding user...');
  }
}

export async function update(data: Pick<User, 'firstName' | 'lastName'>) {
  const owner = await getTokenByCookiesAndDecode();
  if(!owner) throw new Error();
  try {
    await prisma.user.update({
      where: {
        email: owner.email as string//@TODO est-ce que c'est sécurisé d'utiliser l'email qui provient des cookies ?
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
      }
    })
  } catch(e) {
    throw new Error('An error occurred while updating user...');
  }
}
