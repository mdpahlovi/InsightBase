import ArticleCard from "@/components/main/article-card";
import Filter from "@/components/main/filter";
import Header from "@/components/main/header";
import Search from "@/components/main/serach";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Article } from "@/type";
import { cookies } from "next/headers";
import Link from "next/link";

async function getArticles(params: { [key: string]: string }) {
    try {
        const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/article`;
        const authToken = (await cookies()).get("token")?.value;
        const query = new URLSearchParams(params).toString();

        const data = await fetch(`${serverUrl}?${query}`, {
            next: { tags: ["articles"] },
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
        });

        return (await data.json()).data;
    } catch (error) {
        console.error("Failed to fetch articles", error);
        return [];
    }
}

export default async function ArticlesPage(props: { searchParams: Promise<{ [key: string]: string }> }) {
    const searchParams = await props.searchParams;
    const articles: Article[] = await getArticles(searchParams);

    return (
        <>
            <header className="border-b">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text">
                            Insight Base
                        </h1>
                        <Header />
                    </div>
                </div>
            </header>
            <div className="flex-1 w-full max-w-7xl mx-auto p-6 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1 max-w-md">
                        <Search />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter />
                        <Link href="/create-article">
                            <Button className="gap-1">
                                <Icon name="Add" size={24} />
                                Create Article
                            </Button>
                        </Link>
                    </div>
                </div>
                {articles.length ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {articles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <Icon name="Book1" size={48} />
                        <h3 className="font-medium mt-4 mb-1">No articles yet</h3>
                        <p className="text-sm text-muted-foreground mb-5">Get started by creating your first article</p>
                    </div>
                )}
            </div>
        </>
    );
}
