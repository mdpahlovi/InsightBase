"use client";

import { revalidate } from "@/app/action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/lib/axios";
import { X } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function CreateArticlePage() {
    const [text, setText] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [isCreating, setIsCreating] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formTarget = event.currentTarget;
        const formData = new FormData(formTarget);
        const title = formData.get("title") as string;
        const body = formData.get("body") as string;

        if (title && body && tags.length > 0) {
            setIsCreating(true);
            try {
                const response = await axios.post("/article", { title, body, tags });

                setTags([]);
                formTarget.reset();
                revalidate("articles");

                toast.success(response.data.message);
            } catch (error) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                toast.error(error?.message);
            } finally {
                setIsCreating(false);
            }
        } else {
            toast.error("All fields are required");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create a new article</CardTitle>
                    <CardDescription>Fill the form below to create a new article</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" placeholder="Enter article title..." className="text-lg" />
                    </div>

                    <div>
                        <Label className="mb-2">Tags</Label>
                        {tags.length ? (
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
                        ) : null}
                        <div className="flex gap-2 mb-1">
                            <Input
                                placeholder="Add a tag..."
                                className="flex-1"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && text) {
                                        e.preventDefault();
                                        setTags([...tags, text]);
                                        setText("");
                                    }
                                }}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    if (text) {
                                        setTags([...tags, text]);
                                        setText("");
                                    }
                                }}
                            >
                                <Icon name="Add" size={24} />
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Press Enter or click the plus button to add tags</p>
                    </div>

                    <div>
                        <Label htmlFor="body" className="mb-2">
                            Body
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
                        <Link href="/">
                            <Button variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={isCreating}>
                            {isCreating ? "Publishing..." : "Publish Article"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
