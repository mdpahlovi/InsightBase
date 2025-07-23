import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Edit, Share, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";

// Dummy article data
const article = {
    id: 1,
    title: "Getting Started with React Server Components",
    body: `# Getting Started with React Server Components

React Server Components represent a new paradigm in React development, allowing components to render on the server and stream to the client. This approach offers significant performance benefits and improved user experience.

## What are React Server Components?

React Server Components (RSCs) are a new type of component that runs on the server instead of the client. They allow you to:

- Reduce bundle size by keeping large dependencies on the server
- Access backend resources directly (databases, file systems, etc.)
- Improve initial page load performance
- Maintain rich interactivity where needed

## Key Benefits

### Performance Improvements
- **Reduced JavaScript bundle size**: Server components don't ship to the client
- **Faster initial page loads**: HTML is generated on the server
- **Better Core Web Vitals**: Improved LCP and FID scores

### Developer Experience
- **Direct data access**: Query databases directly in your components
- **Simplified data fetching**: No need for separate API routes
- **Better SEO**: Server-rendered content is immediately available to crawlers

## Implementation Example

Here's a simple example of a React Server Component:

\`\`\`jsx
// This component runs on the server
async function UserProfile({ userId }) {
  // Direct database access - this runs on the server
  const user = await db.user.findUnique({
    where: { id: userId }
  })

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
\`\`\`

## Best Practices

1. **Use Server Components for data fetching**: Leverage direct database access
2. **Keep Client Components minimal**: Only use them for interactivity
3. **Optimize the boundary**: Carefully choose where to split server and client components
4. **Consider caching strategies**: Implement appropriate caching for better performance

## Conclusion

React Server Components are a powerful addition to the React ecosystem, offering significant performance benefits and improved developer experience. As the ecosystem continues to evolve, RSCs will likely become a standard part of modern React applications.`,
    tags: ["React", "Next.js", "SSR"],
    createdAt: "2024-01-15",
    summary:
        "This article introduces React Server Components, explaining their benefits for performance and developer experience, including reduced bundle sizes, faster page loads, and direct server-side data access capabilities.",
};

export default function ArticleDetailPage() {
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
                            <h1 className="text-2xl font-bold inline-block">Article Detail</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                                <Share className="h-4 w-4 mr-2" />
                                Share
                            </Button>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card className="mb-6">
                    <CardContent>
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <CardTitle className="text-2xl mb-3">{article.title}</CardTitle>
                                <CardDescription className="flex items-center text-sm">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Created on{" "}
                                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </CardDescription>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {article.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                {article.summary && (
                    <Card className="mb-6 border border-primary/40 bg-primary/20">
                        <CardContent>
                            <CardTitle className="flex items-center">
                                <Sparkles className="h-5 w-5 mr-2" />
                                AI Summary
                            </CardTitle>
                            <p className="mt-3 text-sm">{article.summary}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Generate Summary Button (if no summary exists) */}
                {!article.summary && (
                    <Card className="mb-6 border-primary bg-primary/10">
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                                <h3 className="text-lg font-medium text-purple-800 mb-2">Generate AI Summary</h3>
                                <p className="text-purple-700 mb-4">
                                    Get an AI-powered summary of this article to quickly understand the key points.
                                </p>
                                <Button className="bg-purple-600 hover:bg-purple-700">
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Generate Summary
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardContent className="pt-6">
                        <div className="prose prose-gray max-w-none">
                            <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground text-sm">{article.body}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
