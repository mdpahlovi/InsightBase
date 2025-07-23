import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/", "/create-article", /^\/article\/[^\/]+$/];
const publicRoutes = ["/signin", "/signup"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = (await cookies()).get("token")?.value;

    const isPrivateRoute = privateRoutes.some((route) => (typeof route === "string" ? route === path : route.test(path)));
    const isPublicRoute = publicRoutes.includes(path);

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
