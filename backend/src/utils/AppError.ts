export class AppError extends Error {
    statusCode: number;

    constructor(message: string | string[], statusCode: number) {
        super(Array.isArray(message) ? message.join(" - ") : message);

        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}
