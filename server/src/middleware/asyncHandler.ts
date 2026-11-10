import { NextFunction, Request, RequestHandler, Response } from "express";

// Lets route handlers be async without try/catch in every one (Express 4).
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler =>
  (req, res, next) => {
    fn(req, res, next).catch(next);
  };
