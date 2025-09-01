import { ProductService } from "../services/productService";
import { Request, Response } from "express";
import { Product } from "../interfaces";

export class ProductController {
  constructor(private productService: ProductService) {}

  /**
   * Get filtered product data
   * @param req Express request object
   * @param res Express response object
   * @returns Filtered product data
   *
   * This method retrieves the filtered product data based on the query parameters.
   */
  getData(req: Request, res: Response) {
    const filterQueryParams = req.query.filter as string;
    if (filterQueryParams) {
      const filteredTypes: (keyof Product)[] = [
        "id",
        "name",
        "price",
        "description",
      ];
      const filterKeys = filterQueryParams
        .split(",")
        .filter((key): key is keyof Product =>
          filteredTypes.includes(key as keyof Product)
        );
      return this.productService.filterdByQuery(filterKeys);
    }

    return this.productService.getAllProducts();
  }

  /*

   @param req Express request object
   @param res Express response object
   @returns Product data

   This method retrieves the product data by ID.
   */
  getProductById(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (id < 30 && !isNaN(id)) {
      let targetProduct = this.productService.getProductById(id);

      res.status(200).send(targetProduct);
    } else {
      res.status(404).send("Product not found");
    }
  }

  updateProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    const key = req.body;

    if (id < 30 && !isNaN(id)) {
      let updatedProduct = this.productService.updateProductById(id, key);

      res.status(200).send(updatedProduct);
    } else {
      res.status(404).send("Product not found");
    }
  }

  createProduct(req: Request, res: Response) {
    const newProduct = req.body;
    const allNewProducts = this.productService.createProduct(newProduct);
    return allNewProducts;
  }

  deleteProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (id < 30 && !isNaN(id)) {
      return this.productService.deleteProductById(id);
    } else {
      return undefined;
    }
  }

  renderProductsList(req: Request, res: Response) {
    res.render("index", {
      products: this.productService.getAllProducts(),
    });
  }
}
