import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { ProductService } from "../services/productService";
import { fakeUserData } from "../utils/fakeData";

let products = fakeUserData();

let service = new ProductService(products);

let { createProduct, getProductById, updateProduct, deleteProduct, getData } =
  new ProductController(service);

const productsRouter = Router();

productsRouter.get("/", getData);
productsRouter.get("/:id", getProductById);
productsRouter.post("/", createProduct);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);

export default productsRouter;
