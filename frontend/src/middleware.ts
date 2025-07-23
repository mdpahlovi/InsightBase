import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/"];
const publicRoutes = ["/signin", "/signup"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isPrivateRoute = privateRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const token = (await cookies()).get("token")?.value;

    if (isPrivateRoute && !token) {
        return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }

    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
