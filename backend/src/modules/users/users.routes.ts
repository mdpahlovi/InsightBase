import { Router } from "express";
import { getUsers } from "./users.controller";

const router = Router();

router.get("/", getUsers);

export default router;
