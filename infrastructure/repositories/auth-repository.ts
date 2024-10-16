"use server";

import { cookies } from 'next/headers'
import {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';
import {setCookie} from "undici-types";

const prisma = new PrismaClient();

export async function authUser(data: Pick<User, 'email' | 'password'>) {
    let user;

    try {
        user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
    } catch (e) {
        throw new Error('An error occurred while finding user...');
    }

    // const isMatch = await bcrypt.compare(data.password, user.password);

    if (!user || user?.password !== data.password) {
        throw new Error('Invalid credentials');
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT secret not found');
    }

    const token = jwt.sign({ email: user.email, firstname: user.firstName, lastname: user.lastName }, jwtSecret, {
        expiresIn: 60 * 60,
    });

    cookies().set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
    });
}