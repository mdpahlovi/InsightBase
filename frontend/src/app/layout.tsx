import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const headFont = Outfit({
    variable: "--font-head",
    subsets: ["latin"],
});

const bodyFont = Plus_Jakarta_Sans({
    variable: "--font-body",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "InsightBase",
    description: "InsightBase is a modern AI-powered tool that enables users to create, manage, search, and summarize articles.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${headFont.variable} ${bodyFont.variable} antialiased`}>{children}</body>
        </html>
    );
}
