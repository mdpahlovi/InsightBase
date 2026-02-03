import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ArticleService } from "./articles.service";

export class ArticleController {
    articleService = new ArticleService();

    createArticle = catchAsync(async (req: Request, res: Response) => {
        // @ts-ignore
        const article = await this.articleService.createArticle(req.body, req.user);

        res.status(201).json({
            message: "Article created successfully",
            data: article,
        });
    });

    getAllArticles = catchAsync(async (req: Request, res: Response) => {
        // @ts-ignore
        const articles = await this.articleService.getAllArticles(req.query, req.user);

        res.status(200).json({
            message: "Articles fetched successfully",
            data: articles,
        });
    });

    getAllTags = catchAsync(async (req: Request, res: Response) => {
        const tags = await this.articleService.getAllTags();

        res.status(200).json({
            message: "Tags fetched successfully",
            data: tags,
        });
    });

    getOneArticle = catchAsync(async (req: Request, res: Response) => {
        // @ts-ignore
        const article = await this.articleService.getOneArticle(req.params.id, req.user);

        res.status(200).json({
            message: "Article fetched successfully",
            data: article,
        });
    });

    updateArticle = catchAsync(async (req: Request, res: Response) => {
        // @ts-ignore
        return await this.articleService.updateArticle(req.params.id, req.body, res);
    });

    deleteArticle = catchAsync(async (req: Request, res: Response) => {
        // @ts-ignore
        const article = await this.articleService.deleteArticle(req.params.id, req.user);

        res.status(200).json({
            message: "Article deleted successfully",
            data: article,
        });
    });
}
