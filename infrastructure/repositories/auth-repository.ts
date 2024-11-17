'use server';

import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { setCookie } from 'undici-types';
import { SignJWT } from 'jose';

const prisma = new PrismaClient();

export async function authUser(data: Pick<User, 'email' | 'password'>) {
  let user;

  try {
    user = await prisma.user.findUniqueOrThrow({
      where: {
        email: data.email,
        password: data.password,
      },
    });
  } catch (e) {
    throw new Error('An error occurred while finding user...');
  }

  // const isMatch = await bcrypt.compare(data.password, user.password);

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
