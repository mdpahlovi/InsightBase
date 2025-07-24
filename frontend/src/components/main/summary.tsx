"use client";

import { Article } from "@/type";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";

export default function Summary({ article }: { article: Article }) {
    const [summary, setSummary] = useState(article?.summary || "");
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateSummary = async () => {
        setIsLoading(true);

        try {
            const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/article`;
            const res = await fetch(`${serverUrl}/${article.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ body: article.body }),
                credentials: "include",
            });

            if (!res.ok || !res.body) {
                toast.error("Failed to generate summary");
                return;
            }

            const reader = res.body.getReader();
            const decode = new TextDecoder();

            let buffer = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decode.decode(value, { stream: true });
                setSummary(buffer);
            }
            toast.success("Summary generated successfully");
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            toast.error(error?.message || "Failed to generate summary");
        } finally {
            setIsLoading(false);
        }
    };

    if (summary) {
        return (
            <Card className="mb-6 border border-primary/40 bg-primary/20">
                <CardContent>
                    <CardTitle className="flex items-center">
                        <Sparkles className="h-5 w-5 mr-2" />
                        AI Summary
                    </CardTitle>
                    <p className="mt-3 text-sm">{summary}</p>
                </CardContent>
            </Card>
        );
    } else {
        return (
            <Card className="mb-6 border border-primary/40 bg-primary/20">
                <CardContent>
                    <div className="text-center">
                        <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
                        <CardTitle className="mb-2">Generate AI Summary</CardTitle>
                        <p className="text-sm mb-4">Get an AI-powered summary of this article to quickly understand the key points.</p>
                        <Button onClick={handleGenerateSummary} disabled={isLoading}>
                            <Sparkles className="h-4 w-4 mr-2" />
                            {isLoading ? "Generating..." : "Generate Summary"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }
}
