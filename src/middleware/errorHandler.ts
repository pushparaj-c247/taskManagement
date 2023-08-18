import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) =>{
    console.log("errorHandler", err)
    next()
}
export default errorHandler;