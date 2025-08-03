import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";

export class AuthController {
    private authService = new AuthService();

    signup = catchAsync(async (req: Request, res: Response) => {
        const data = await this.authService.signup(req.body);

        res.status(201).json({
            message: "Signup successfully",
            data,
        });
    });

    signin = catchAsync(async (req: Request, res: Response) => {
        const data = await this.authService.signin(req.body);

        res.status(200).json({
            message: "Signin successfully",
            data,
        });
    });

    signout = catchAsync(async (req: Request, res: Response) => {
        res.clearCookie("token");
        res.status(200).json({
            message: "Signout successfully",
        });
    });
}
