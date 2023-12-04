import {Request, Response, NextFunction, RequestHandler} from "express";
import {validate} from "class-validator";

export default function BodyValidatorMiddleware<T extends {new(a: any): {}}>(Type: T): RequestHandler {
    return async (req, res: Response, next: NextFunction) => {
        const body = new Type(req.body);

        const error = await validate(body, {whitelist: true});
        if (error.length > 0) next(error);

        req.body = body;

        next();
    }
}