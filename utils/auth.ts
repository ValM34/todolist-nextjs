"use server";


import {cookies} from "next/headers";
import {decodeJwt, jwtVerify} from "jose";
import jwt from "jsonwebtoken";

export async function getToken(): Promise<string | null> {
    const token = cookies().get('token');
    if (!token) return null;
    return token.value;
}

export async function isAuth(): Promise<boolean> {
    const token = await getToken();
    if (!token) return false;
    try {
        const {payload} = await jwtVerify(
            token,
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

export async function getUser(): Promise<UserVerify | null> {
    const token = await getToken()
    if (!token) return null;
    const { iat, exp, ...userPayload } = decodeJwt(token);
    return userPayload as UserVerify;
}