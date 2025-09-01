import express from "express";
import { fakeUserData } from "./utils/fakeData";
import { ProductController } from "./controllers/productController";
import { ProductService } from "./services/productService";
import path from "path";
const app = express();

app.use(
  express.json({
    type: "application/json",
  })
);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let products = fakeUserData();

let service = new ProductService(products);

let controller = new ProductController(service);

// * Routes

// Product view Routes

app.get("/products", (req, res) => {
  controller.renderProductsList(req, res);
});

app.get("/products/:id", (req, res) => {
  controller.renderProductDetail(req, res);
});

// API Routes

app.get("/api/products", (req, res) => {
  res.send(controller.getData(req, res));
});

app.get("/products/:id", (req, res) => {
  res.send(controller.getProductById(req, res));
});

// create new product

app.post("/api/products", (req, res) => {
  res.send(controller.createProduct(req, res));
});

// update product

app.patch("/api/products/:id", (req, res) => {
  res.send(controller.updateProduct(req, res));
});

// delete product

app.delete("/api/products/:id", (req, res) => {
  res.send(controller.deleteProduct(req, res));
});

app.listen(3001, () => {
  console.log("http://localhost:3001");
});
