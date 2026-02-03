import { prisma } from "../../utils/prisma";
import { Prisma, User } from "../../generated/prisma/client";
import { AppError } from "../../utils/AppError";
import { CreateArticleBody } from "./articles.interface";
import { model } from "../../utils/model";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { Response } from "express";

export class ArticleService {
    async createArticle(data: CreateArticleBody, user: User) {
        const article = await prisma.article.create({
            data: { ...data, tags: data.tags.map((tag) => tag.toLowerCase()), userId: user.id },
        });

        if (!article) {
            throw new AppError("Article not created", 500);
        }

        return article;
    }

    async getAllArticles(query: any, user: User) {
        let filter: Prisma.ArticleWhereInput = { userId: user.id };

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

    async getAllTags() {
        const tags: { tags: string[] }[] = await prisma.$queryRawUnsafe(`
            SELECT array_agg(DISTINCT tag) AS tags
            FROM articles, unnest(tags) AS tag;
        `);

        return tags?.length ? tags[0].tags : [];
    }

    async getOneArticle(id: string, user: User) {
        const article = await prisma.article.findUnique({ where: { id, userId: user.id } });

        if (!article) {
            throw new AppError("Article not found", 404);
        }

        return article;
    }

    async updateArticle(id: string, data: { body: string }, res: Response) {
        const chunk = await model.stream([new SystemMessage("Summarize this article"), new HumanMessage(data.body)]);
        let summary = "";

        res.setHeader("Content-Type", "text/plain");

        for await (const c of chunk) {
            summary += c.text;
            res.write(c.text);
        }

        await prisma.article.update({ where: { id }, data: { summary } });

        res.end();
    }

    async deleteArticle(id: string, user: User) {
        const article = await prisma.article.delete({ where: { id, userId: user.id } });

        if (!article) {
            throw new AppError("Article not found", 404);
        }

        return article;
    }
}
