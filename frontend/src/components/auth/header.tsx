"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthHeader() {
    const pathname = usePathname();

    switch (pathname) {
        case "/signin":
            return (
                <>
                    <h2 className="mt-4 text-3xl font-bold">Welcome Back</h2>
                    <p className="mt-2 text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline">
                            Signup
                        </Link>
                    </p>
                </>
            );
        case "/signup":
            return (
                <>
                    <h2 className="mt-4 text-3xl font-bold">Create Account</h2>
                    <p className="mt-2 text-sm">
                        Already have an account?{" "}
                        <Link href="/signin" className="underline">
                            Signin
                        </Link>
                    </p>
                </>
            );
        default:
            return null;
    }
}
