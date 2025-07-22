"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthState } from "@/stores/useAuthStore";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
    const { signin, signinLoading } = useAuthState();

    async function handleSignin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (email && password) {
            signin({ email, password });
        } else {
            toast.error("All fields are required");
        }
    }

    return (
        <form onSubmit={handleSignin}>
            <Card>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" placeholder="john@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" name="password" placeholder="••••••••" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">Remember</Label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-primary">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={signinLoading}>
                        {signinLoading ? "Signing in..." : "Sign in"}
                    </Button>
                </CardContent>
            </Card>
        </form>
    );
}
