import { PrismaClient, User } from "@prisma/client";
import { AppError } from "../../utils/AppError";
import { CreateArticleBody } from "./articles.interface";

const prisma = new PrismaClient();

export class ArticleService {
    async createArticle(data: CreateArticleBody, user: User) {
        const article = await prisma.article.create({ data: { ...data, userId: user.id } });

        if (!article) {
            throw new AppError("Article not created", 500);
        }

        return article;
    }

    getAllArticles(query: any, user: User) {
        const search: string = query.search || "";
        const tags: string[] = query.tags || [];

        const articles = prisma.article.findMany({
            where: {
                title: { contains: search },
                tags: { hasSome: tags },
            },
        });

        return articles;
    }

    getOneArticle(id: string, user: User) {
        const article = prisma.article.findUnique({ where: { id } });

        if (!article) {
            throw new AppError("Article not found", 404);
        }

        return article;
    }
}
