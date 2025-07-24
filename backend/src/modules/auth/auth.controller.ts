import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";

export class AuthController {
    private authService = new AuthService();

    signup = catchAsync(async (req: Request, res: Response) => {
        const { user, token } = await this.authService.signup(req.body);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            message: "Signup successfully",
            data: { user },
        });
    });

    signin = catchAsync(async (req: Request, res: Response) => {
        const { user, token } = await this.authService.signin(req.body);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Signin successfully",
            data: { user },
        });
    });
}
