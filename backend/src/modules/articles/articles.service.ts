import { Prisma, PrismaClient, User } from "@prisma/client";
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

    async getAllArticles(query: any, user: User) {
        let filter: Prisma.ArticleWhereInput = {};

        if (query?.search) {
            filter = { ...filter, title: { contains: query?.search, mode: "insensitive" } };
        }

        if (query?.tags) {
            filter = { ...filter, tags: { hasSome: query?.tags?.split(",") } };
        }

        if (query?.summary) {
            switch (query?.summary) {
                case "with":
                    filter = { ...filter, summary: { not: null } };
                    break;
                case "without":
                    filter = { ...filter, summary: null };
                    break;
            }
        }

        const articles = await prisma.article.findMany({
            where: { ...filter },
        });

        return articles;
    }

    async getOneArticle(id: string, user: User) {
        const article = await prisma.article.findUnique({ where: { id } });

        if (!article) {
            throw new AppError("Article not found", 404);
        }

        return article;
    }

    async deleteArticle(id: string, user: User) {
        const article = await prisma.article.delete({ where: { id } });

        if (!article) {
            throw new AppError("Article not found", 404);
        }

        return article;
    }
}
