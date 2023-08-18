import { Request, Response, NextFunction } from "express";

const errorLast = (req: Request, res:Response, next: NextFunction) =>{
    res.status(500);
    res.send("Something Went Wrong")
}
export default errorLast