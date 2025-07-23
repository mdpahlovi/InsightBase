"use client";

import Header from "@/components/main/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function CreateArticlePage() {
    const [text, setText] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const title = formData.get("title") as string;
        const body = formData.get("body") as string;

        if (title && tags.length > 0 && body) {
            console.log({ title, tags, body });
        } else {
            toast.error("All fields are required");
        }
    }

    return (
        <>
            <header className="border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Link href="/">
                                <Button variant="ghost" size="sm">
                                    <Icon name="ArrowLeft2" size={18} />
                                </Button>
                            </Link>
                            <h1 className="font-bold inline-block">Create Article</h1>
                        </div>
                        <Header />
                    </div>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" placeholder="Enter article title..." className="text-lg" />
                        </div>

                        <div>
                            <Label className="mb-2">Tags</Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {tags.map((tag) => (
                                    <div key={tag} className="relative flex items-center">
                                        <Badge className="pr-[22px]">{tag}</Badge>
                                        <X
                                            onClick={() => setTags(tags.filter((b) => b !== tag))}
                                            className="absolute right-1.5 h-3 w-3 cursor-pointer hover:text-red-500"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2 mb-1">
                                <Input
                                    placeholder="Add a tag..."
                                    className="flex-1"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && setTags([...tags, text])}
                                />
                                <Button variant="outline" onClick={() => setTags([...tags, text])}>
                                    <Icon name="Add" size={24} />
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">Press Enter or click the plus button to add tags</p>
                        </div>

                        <div>
                            <Label htmlFor="body" className="mb-2">
                                Content
                            </Label>
                            <Textarea
                                id="body"
                                name="body"
                                placeholder="Write your article content here..."
                                className="min-h-[400px] resize-none mb-1"
                            />
                            <p className="text-xs text-muted-foreground">Supports markdown formatting</p>
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t">
                            <Link href="/dashboard">
                                <Button variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit">Publish Article</Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </>
    );
}
