"use client";

import { useAuthState } from "@/stores/useAuthStore";
import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Header() {
    const { user } = useAuthState();

    return (
        <div className="flex items-center gap-2">
            <Avatar>
                <AvatarFallback>
                    <User className="h-4 w-4" />
                </AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
        </div>
    );
}
