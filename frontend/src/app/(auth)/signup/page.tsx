"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthState } from "@/stores/useAuthStore";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
    const route = useRouter();
    const { signup, signupLoading } = useAuthState();

    async function handleSignup(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formTarget = event.currentTarget;
        const formData = new FormData(formTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (name && email && password) {
            signup({ name, email, password });

            formTarget.reset();
            route.replace("/");
        } else {
            toast.error("All fields are required");
        }
    }

    return (
        <form onSubmit={handleSignup}>
            <Card>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" type="text" name="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" placeholder="john@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" name="password" placeholder="••••••••" required />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">
                            I agree to the{" "}
                            <a href="#" className="text-primary">
                                Terms & Conditions
                            </a>{" "}
                        </Label>
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={signupLoading}>
                        {signupLoading ? "Signing up..." : "Sign up"}
                    </Button>
                </CardContent>
            </Card>
        </form>
    );
}
