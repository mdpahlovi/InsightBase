import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Article } from "@/type";
import Link from "next/link";
import DeleteButton from "./delete-button";

export default function ArticleCard({ article }: { article: Article }) {
    return (
        <Card>
            <CardContent className="flex-1">
                <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                <CardDescription className="flex items-center gap-1 mb-3">
                    <Icon name="Calendar" size={14} />
                    {new Date(article.createdAt).toLocaleDateString()}
                </CardDescription>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{article.body}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                    ))}
                </div>
                <div className="flex-1 flex-grow flex justify-between items-center">
                    <Link href={`/article/${article.id}`}>
                        <Button variant="outline" size="sm">
                            <Icon name="Eye" />
                            View
                        </Button>
                    </Link>
                    <DeleteButton article={article} />
                </div>
            </CardContent>
        </Card>
    );
}
