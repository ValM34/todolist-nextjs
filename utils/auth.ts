"use server";


import {cookies} from "next/headers";
import {jwtVerify} from "jose";
import jwt from "jsonwebtoken";

export async function isAuth(): Promise<boolean> {
    const token = cookies().get('token');
    if (!token) return false;
    try {
        const {payload} = await jwtVerify(
            token.value,
            new TextEncoder().encode(process.env.JWT_SECRET)
        );

        const { iat, exp, ...userPayload } = payload;
        const jwtSecret = process.env.JWT_SECRET as string;
        const newToken = jwt.sign(userPayload, jwtSecret, {
            expiresIn: 60 * 60,
        });

        cookies().set('token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
        });
    } catch (error) {
        return false;
    }


    return true;
}