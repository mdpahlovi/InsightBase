"use client";

import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BackButton() {
    const pathname = usePathname();

    if (pathname !== "/") {
        return (
            <Link href={"/"}>
                <button className="p-2 rounded-full border cursor-pointer hover:bg-card">
                    <Icon name="ArrowLeft2" />
                </button>
            </Link>
        );
    } else {
        return null;
    }
}
