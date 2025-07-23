import Summary from "@/components/main/summary";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Article } from "@/type";
import { Calendar } from "lucide-react";
import { cookies } from "next/headers";

async function getOneArticle(id: string): Promise<Article | null> {
    try {
        const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/article`;
        const authToken = (await cookies()).get("token")?.value;

        const data = await fetch(`${serverUrl}/${id}`, {
            next: { tags: [`article_${id}`] },
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
        });

        return (await data.json()).data;
    } catch (error) {
        console.error("Failed to fetch articles", error);
        return null;
    }
}

export default async function ArticleDetailPage(props: { params: Promise<{ [key: string]: string }> }) {
    const id = (await props.params)?.id;
    const article = await getOneArticle(id);

    if (!article) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center">
                <Icon name="EmojiSad" size={48} />
                <h3 className="font-medium mt-4 mb-1">Opps! aricle not found</h3>
                <p className="text-sm text-muted-foreground mb-5">The article you are looking for does not exist</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
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
                                    month: "short",
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
            <Summary article={article} />
            <Card>
                <CardContent>
                    <div className="prose prose-gray max-w-none">
                        <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground text-sm">{article.body}</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
