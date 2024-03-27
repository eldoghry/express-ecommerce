import { Express, Request, Response } from "express";
import { ProductService } from "../service/product.service";

// routes
const routerSetup = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello World!!");
  });

  app.get("/products", async (req: Request, res: Response) => {
    const service = new ProductService();
    const products = await service.getAll();

    res.status(200).json(products);
  });
};

export default routerSetup;
