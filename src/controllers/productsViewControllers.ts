import { ProductService } from "../services/productService";
import { Request, Response } from "express";
export class ProductsViewControllers {
  constructor(private productService: ProductService) {}

  renderProductsList = (req: Request, res: Response) => {
    res.render("index", {
      products: this.productService.getAllProducts(),
    });
  };

  renderProductDetail = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const product = this.productService.getProductById(id);
    console.log(product);

    res.render("productDetail", {
      productData: product,
    });
  };
}
