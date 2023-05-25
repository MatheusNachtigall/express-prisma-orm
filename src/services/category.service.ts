import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export default class CategoryService {
  public create = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      const category = await prismaClient.category.create({
        data: { name },
      });
      return res
        .status(201)
        .json({ message: `Category '${name}' has been created.`, category });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  };
}
