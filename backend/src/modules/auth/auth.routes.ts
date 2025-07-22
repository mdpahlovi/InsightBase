import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../utils/validate";
import { authValidation } from "./auth.validation";

const router = Router();
const authController = new AuthController();

router.post("/signup", validate(authValidation.signup), authController.signup);
router.post("/signin", validate(authValidation.signin), authController.signin);

export const authRoutes = router;
