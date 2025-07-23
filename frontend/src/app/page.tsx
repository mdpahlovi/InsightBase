import Header from "@/components/main/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Calendar, Eye, Filter, Plus, Search, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";

const articles = [
    {
        id: 1,
        title: "Getting Started with React Server Components",
        body: "React Server Components represent a new paradigm in React development, allowing components to render on the server and stream to the client. This approach offers significant performance benefits and improved user experience...",
        tags: ["React", "Next.js", "SSR"],
        createdAt: "2024-01-15",
        summary: null,
    },
    {
        id: 2,
        title: "Advanced TypeScript Patterns",
        body: "TypeScript offers powerful type system features that can help you write more robust and maintainable code. In this comprehensive guide, we'll explore advanced patterns including conditional types, mapped types, and utility types...",
        tags: ["TypeScript", "Patterns", "Development"],
        createdAt: "2024-01-12",
        summary:
            "This article covers advanced TypeScript patterns including conditional types, mapped types, and utility types for better code organization and type safety.",
    },
    {
        id: 3,
        title: "Database Design Best Practices",
        body: "When designing databases, it's crucial to consider normalization, indexing strategies, and performance implications. This article covers essential principles for creating efficient and scalable database schemas...",
        tags: ["Database", "PostgreSQL", "Design"],
        createdAt: "2024-01-10",
        summary: null,
    },
    {
        id: 4,
        title: "Modern CSS Grid Layouts",
        body: "CSS Grid has revolutionized how we approach web layouts. Learn how to create complex, responsive designs with minimal code using CSS Grid's powerful features...",
        tags: ["CSS", "Grid", "Frontend"],
        createdAt: "2024-01-08",
        summary: "A comprehensive guide to CSS Grid covering basic concepts, advanced techniques, and real-world layout examples.",
    },
];

export default function ArticlesPage() {
    return (
        <>
            <header className="border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text">
                            Insight Base
                        </h1>
                        <Header />
                    </div>
                </div>
            </header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                            <Input placeholder="Search articles..." className="pl-10" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                        <Link href="/create-article">
                            <Button size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Create Article
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {articles.map((article) => (
                        <Card key={article.id} className="">
                            <CardContent className="flex-1">
                                <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                                <CardDescription className="flex items-center mb-3">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {new Date(article.createdAt).toLocaleDateString()}
                                </CardDescription>

                                <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{article.body}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {article.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex-1 flex-grow flex justify-between items-center">
                                    <div className="flex space-x-2">
                                        <Link href={`/article/${article.id}`}>
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4 mr-1" />
                                                View
                                            </Button>
                                        </Link>
                                        {!article.summary && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-purple-600 border-purple-200 hover:bg-purple-50 bg-transparent"
                                            >
                                                <Sparkles className="h-4 w-4 mr-1" />
                                                Summarize
                                            </Button>
                                        )}
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State (when no articles) */}
                {articles.length === 0 && (
                    <div className="text-center py-12">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No articles yet</h3>
                        <p className="text-gray-600 mb-4">Get started by creating your first article</p>
                        <Link href="/create-article">
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Article
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
