import { Request, Response } from "express";

export const simpleRedirectMiddleware = (
  req: Request,
  res: Response,
  next: any
) => {
  if (req.originalUrl.includes("favicon.ico")) {
    return res.status(204).end();
  }

  next();
};
