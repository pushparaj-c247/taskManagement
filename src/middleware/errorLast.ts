import { Request, Response } from "express";

const errorLast = (req: Request, res: Response) => {
    res.status(500);
    res.send("Something Went Wrong")
}
export default errorLast