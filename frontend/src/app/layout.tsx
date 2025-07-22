import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "InsightBase",
    description: "InsightBase is a modern AI-powered tool that enables users to create, manage, search, and summarize articles.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    );
}
