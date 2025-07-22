import AuthHeader from "@/components/auth/header";
import { BookOpen } from "lucide-react";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-primary via-secondary to-accent flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="flex justify-center">
                        <BookOpen className="h-12 w-12" />
                    </div>
                    <AuthHeader />
                </div>

                {children}
            </div>
        </div>
    );
}
