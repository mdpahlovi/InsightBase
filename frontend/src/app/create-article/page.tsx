import Header from "@/components/main/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";

export default function CreateArticlePage() {
    return (
        <>
            <header className="border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Link href="/">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-bold inline-block">Create Article</h1>
                        </div>
                        <Header />
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="Enter article title..." className="text-lg" />
                        </div>

                        <div className="space-y-2">
                            <Label>Tags</Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    React
                                    <X className="h-3 w-3 cursor-pointer hover:text-red-600" />
                                </Badge>
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    TypeScript
                                    <X className="h-3 w-3 cursor-pointer hover:text-red-600" />
                                </Badge>
                            </div>
                            <div className="flex gap-2">
                                <Input placeholder="Add a tag..." className="flex-1" />
                                <Button variant="outline" size="sm">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">Press Enter or click the plus button to add tags</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea id="content" placeholder="Write your article content here..." className="min-h-[400px] resize-none" />
                            <p className="text-sm text-muted-foreground">Supports markdown formatting</p>
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t">
                            <Link href="/dashboard">
                                <Button variant="outline">Cancel</Button>
                            </Link>
                            <div className="flex space-x-2">
                                <Button variant="outline">Save as Draft</Button>
                                <Button>Publish Article</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
