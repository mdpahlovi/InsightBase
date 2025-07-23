import BackButton from "@/components/main/back-button";
import Header from "@/components/main/header";
import Link from "next/link";
import React from "react";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <header className="border-b">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex itementer gap-2">
                            <BackButton />
                            <Link href={"/"}>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text">
                                    Insight Base
                                </h1>
                            </Link>
                        </div>
                        <Header />
                    </div>
                </div>
            </header>
            {children}
        </>
    );
}
