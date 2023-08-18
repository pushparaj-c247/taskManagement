import { Request, Response, NextFunction } from "express";
import { obj } from "../interfaces/userInterface";

const authorization = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const users = req.user as obj;
    if (users.role === role) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
};
export default authorization;
