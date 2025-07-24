import { Router } from "express";
import { protect } from "../../utils/protect";
import { validate } from "../../utils/validate";
import { ArticleController } from "./articles.controller";
import { articleValidation } from "./articles.validation";

const router = Router();
const articleController = new ArticleController();

router.post("/", protect, validate(articleValidation.create), articleController.createArticle);
router.get("/", protect, articleController.getAllArticles);
router.get("/tags", protect, articleController.getAllTags);
router.get("/:id", protect, articleController.getOneArticle);
router.patch("/:id", protect, articleController.updateArticle);
router.delete("/:id", protect, articleController.deleteArticle);

export const articleRoutes = router;
