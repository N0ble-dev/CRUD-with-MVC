import express from "express";
import { fakeUserData } from "./utils/fakeData";
import { ProductController } from "./controllers/productController";
import { ProductService } from "./services/productService";
import path from "path";
import productsRouter from "./routes/productsRoute";
import { ProductsViewControllers } from "./controllers/productsViewControllers";
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

let productController = new ProductController(service);
let productsViewController = new ProductsViewControllers(service);

// * Routes

// Product view Routes

app.get("/products", productsViewController.renderProductsList);

app.get("/products/:id", productsViewController.renderProductDetail);

// API Routes

app.use("/api/products", productsRouter);

app.listen(3001, () => {
  console.log("http://localhost:3001");
});
