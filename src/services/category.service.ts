import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export default class CategoryService {
  public create = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
      const categoryAlreadyExists = !!(await prismaClient.category.findFirst({
        where: { name },
      }));

      if (categoryAlreadyExists) {
        throw new Error("Category already exists!");
      }
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }

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

  public find = async (req: Request, res: Response) => {
    const category_id = req.params.category_id;
    try {
      const category = await prismaClient.category.findUnique({
        where: {
          id: category_id,
        },
        include: {
          ProductCategory: {
            include: { product: true },
          },
        },
      });

      if (!category) {
        return res.status(404).json({ message: `Category not found.` });
      }

      return res.status(201).json({
        category,
      });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  };
}
