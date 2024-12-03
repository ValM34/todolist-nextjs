import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const number = Math.random();
    return NextResponse.json({ number });
}
