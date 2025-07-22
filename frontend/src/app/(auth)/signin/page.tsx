import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
    async function signinAction(formData: FormData) {
        "use server";

        const rawFormData = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        console.log(rawFormData);
    }

    return (
        <form action={signinAction}>
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
                    <Button type="submit" className="w-full" size="lg">
                        Sign in
                    </Button>
                </CardContent>
            </Card>
        </form>
    );
}
