import {NextFunction, Request, Response,} from "express";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(`An error has occurred:\n${err}`);

    res.send(err);
}

export default errorHandler;