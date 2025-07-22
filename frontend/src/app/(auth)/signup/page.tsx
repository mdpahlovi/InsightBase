import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
    async function signupAction(formData: FormData) {
        "use server";

        const rawFormData = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        console.log(rawFormData);
    }

    return (
        <form action={signupAction}>
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
                    <Button type="submit" className="w-full" size="lg">
                        Sign up
                    </Button>
                </CardContent>
            </Card>
        </form>
    );
}
