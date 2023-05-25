import { Request, Response } from "express";

export default class MainService {
  public find = async (req: Request, res: Response) => {
    try {
      res.status(201).json({ message: "Server is running..." });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  };
}
