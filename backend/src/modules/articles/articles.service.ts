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
        const search = query.search?.trim();
        const tags = Array.isArray(query.tags) ? query.tags : [];

        let filter: Prisma.ArticleWhereInput = {};

        if (search) {
            filter = { ...filter, title: { contains: search, mode: "insensitive" } };
        }

        if (tags.length) {
            filter = { ...filter, tags: { hasSome: tags } };
        }

        const articles = await prisma.article.findMany({
            where: { ...filter },
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
