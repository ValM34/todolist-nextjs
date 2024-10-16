"use server";

import { cookies } from "next/headers";
import { decodeJwt } from "jose";

export async function getTokenByCookiesAndDecode() {
  const token = cookies().get('token');
  if (!token) return null;
  const payload = decodeJwt(token.value);
  return payload;
}
