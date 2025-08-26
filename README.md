# Product API — TypeScript & Express Example

A simple TypeScript + Express API that demonstrates clean separation of concerns with **controllers**, **services**, and **utils**.  
The API manages an in-memory list of products (generated with [`@faker-js/faker`](https://www.npmjs.com/package/@faker-js/faker)) and implements basic CRUD operations and field filtering.

---

## ✨ Features
- Generate fake product data at startup
- REST API with CRUD endpoints:
  - Create, Read (all/one), Update, Delete
- Filter product fields via query params (e.g. `?filter=name,price`)
- Type-safe with TypeScript
- Clear project structure (controllers, services, utils, interfaces)

---

## 📂 Project Structure
```bash

src/
├─ controllers/ # Route controllers
│ └─ productController.ts # Handles product-related requests
├─ services/ # Business logic layer
│ └─ productService.ts # Product operations (CRUD, filtering, etc.)
├─ utils/ # Helper functions
│ └─ fakeData.ts # Generates fake product data
├─ interfaces/ # TypeScript interfaces
│ └─ product.ts # Product type definition
└─ server.ts # Express server entry point
```

# Run in development
add ts-node-dev as a devDependency if not already installed
npm run dev

---

##  API Documentation

### Product Data Shape
```ts
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}
```
### `GET /products`
Fetch all products.  
Supports filtering returned fields via the `filter` query param.

- **Query:** `?filter=field1,field2`
- **Example:** `/products?filter=name,price`

---

### `GET /products/:id`
Fetch a product by its `id`.

- **200 OK** → product object  
- **404 Not Found** → `"Product not found"`

---

### `POST /products`
Create a new product.  

**Request body:**
```json
{
  "name": "New Product",
  "price": 12.5,
  "description": "Sample product"
}
```

### `PATCH /products/:id`
Update a product by `id`.

**Request body:**
```json
{
  "price": 19.99
}
```
### `DELETE /products/:id`
DELETE a product by `id`.