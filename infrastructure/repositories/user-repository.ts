"use server";
import {PrismaClient} from '@prisma/client';
import {getUser} from "@/utils/auth";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function createUser(data: Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  try {
    await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
      }
    });
  } catch (e) {
    throw new Error('An error occurred while creating user...');
  }
}

export async function findOneUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) {
      throw new Error('An error occurred while finding user...');
    }

    return user as User;
  } catch(e) {
    throw new Error(e as string);
  }
}

export async function getUserByEmail(): Promise<Pick<User, 'firstName' | 'lastName'> | undefined> {
  const owner = await getUser();
  if(!owner) throw new Error();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: owner.email as string,
      },
    });
    if(!user) {
      throw new Error('An error occurred while finding user...');
    }
    return { firstName: user.firstName, lastName: user.lastName };
  } catch(e) {
    throw new Error('An error occurred while finding user...');
  }
}

export async function update(data: Pick<User, 'firstName' | 'lastName'>) {
  const owner = await getUser();
  if(!owner) throw new Error();
  try {
    await prisma.user.update({
      where: {
        email: owner.email as string
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

export async function authUser(data: Pick<User, 'email' | 'password'>) {
  let user;

  try {
    user = await prisma.user.findUniqueOrThrow({
      where: {
        email: data.email,
      },
    });
  } catch (e) {
    throw new Error('An error occurred while finding user...');
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error('An error occurred while finding user...');
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT secret not found');
  }
  const token = await new SignJWT({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(jwtSecret));

  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
  });
}

export async function disconnectUser() {
  cookies().set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
  });
}
