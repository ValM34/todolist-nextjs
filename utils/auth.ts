'use server'


import { cookies } from 'next/headers'
import { decodeJwt, jwtVerify, SignJWT } from 'jose'

export async function getToken(): Promise<string | null> {
  const token = cookies().get('token')
  if (!token) return null
  return token.value
}

export async function getUser(): Promise<UserVerify | null> {
  const token = await getToken()
  if (!token) return null
  const { iat, exp, ...userPayload } = decodeJwt(token)
  return userPayload as UserVerify
}

export async function logout() {
  cookies().delete('token')
}

export async function isAuth(): Promise<boolean> {
  const token = await getToken()
  if (!token) {
    return false
  }
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
    )
    console.log('payload:', payload)
    const { iat, exp, ...userPayload } = payload
    const currentTime = Date.now() / 1000
    return currentTime <= exp!;
  } catch (error) {
    return false
  }
}

export async function refreshToken(): Promise<string | null> {
  const jwtSecret = process.env.JWT_SECRET as string;
  const user = await getUser();
  if(!user) return null;
  console.log(user)
  return await new SignJWT({ email: user.email, firstname: user.firstName, lastname: user.lastName })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(jwtSecret));
}

