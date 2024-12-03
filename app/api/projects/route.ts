import { NextResponse } from "next/server";

import { findProjectsBy } from "@/infrastructure/repositories/project-repository";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const userFk = request.headers.get('x-email');
    const projects = await findProjectsBy([{ userFk: userFk! }]);
    return NextResponse.json(projects);
}