import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export default class ProductCategoryService {
  public create = async (req: Request, res: Response) => {
    const { product_id, category_id } = req.body;
    try {
      const productCategory = await prismaClient.productCategory.create({
        data: { product_id, category_id },
      });
      return res.status(201).json({
        message: `ProductCategory has been created.`,
        productCategory,
      });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  };
}
