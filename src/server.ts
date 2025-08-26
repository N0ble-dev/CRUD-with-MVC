import express from "express";
import { fakeUserData } from "./utils/fakeData";
import { ProductController } from "./controllers/productController";
import { ProductService } from "./services/productService";
const app = express();

app.use(
  express.json({
    type: "application/json",
  })
);

let products = fakeUserData();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let service = new ProductService(products);

let controller = new ProductController(service);

app.get("/products", (req, res) => {
  res.send(controller.getData(req, res));
});

app.get("/products/:id", (req, res) => {
  res.send(controller.getProductById(req, res));
});

// create new product

app.post("/products", (req, res) => {
  res.send(controller.createProduct(req, res));
});

// update product

app.patch("/products/:id", (req, res) => {
  res.send(controller.updateProduct(req, res));
});

// delete product

app.delete("/products/:id", (req, res) => {
  res.send(controller.deleteProduct(req, res));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
