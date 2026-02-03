import { prisma } from "../../utils/prisma";
import { User } from "../../generated/prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { AppError } from "../../utils/AppError";
import { SigninDto, SignupDto } from "./auth.interface";

export class AuthService {
    async signup(data: SignupDto): Promise<{ user: User; token: string }> {
        const { email, password, name } = data;
        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            throw new AppError("User already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const createdUser = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });

        return this.jwtSignedToken(createdUser);
    }

    async signin(data: SigninDto): Promise<{ user: User; token: string }> {
        const { email, password } = data;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new AppError("Invalid email or password", 401);
        }

        return this.jwtSignedToken(user);
    }

    jwtSignedToken(user: User) {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };

        return { user, token: jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" }) };
    }
}
