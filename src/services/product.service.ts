import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export default class ProductService {
  public create = async (req: Request, res: Response) => {
    const { name, bar_code, price, category_id } = req.body;
    let product = null;
    try {
      if (
        category_id != null &&
        category_id != undefined &&
        category_id != ""
      ) {
        product = await prismaClient.productCategory.create({
          data: {
            product: {
              create: { name, bar_code, price },
            },
            category: {
              connect: {
                id: category_id,
              },
            },
          },
        });
        return res.status(201).json({
          message: `Product '${name}' has been created and linked with category ${category_id}.`,
          product,
        });
      } else {
        product = await prismaClient.product.create({
          data: { name, bar_code, price },
        });
        return res
          .status(201)
          .json({ message: `Product '${name}' has been created.`, product });
      }
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  };
  public find = async (req: Request, res: Response) => {
    const product_id = req.params.product_id;
    try {
      if (product_id == null || product_id == undefined || product_id == "") {
        return res
          .status(404)
          .json({ message: `Product '${product_id}' not found.` });
      }

      console.log(product_id);

      const product = await prismaClient.product.findUnique({
        where: {
          id: product_id,
        },
        include: {
          ProductCategory: {
            include: { category: true },
          },
        },
      });

      return res.status(201).json({
        product,
      });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  };
}
