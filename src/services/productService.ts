import { Product } from "../interfaces";

// will be like data storage

export class ProductService {
  constructor(private products: Product[]) {
    this.products = products;
  }

  getAllProducts(): Product[] {
    return this.products;
  }
  /*
 here we take the filtered keys and return the filtered products
 *
 * @param filteredQuery - The keys to filter the products by
 * @returns The filtered products
 */
  filterdByQuery(filteredQuery?: (keyof Product)[]) {
    if (filteredQuery) {
      if (filteredQuery.length === 0) {
        return this.getAllProducts();
      }
      if (!filteredQuery.includes("id")) {
        filteredQuery.unshift("id");
      }
      const filterValues = this.getAllProducts().map((product) => {
        return Object.fromEntries(
          filteredQuery.map((key) => [key, product[key]])
        ) as Pick<Product, (typeof filteredQuery)[number]>;
      });
      return filterValues;
    }

    return this.getAllProducts();
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  /*
   * Update a product by ID
   * @param id - The ID of the product to update
   * @param keys - The updated product data
   * @returns The updated product
   *
   * This method updates a product by its ID.
   *
   */

  updateProductById(id: number, keys: any): Product | undefined {
    let targetProduct = this.products.find((product) => product.id === id);
    if (targetProduct) {
      for (const key in keys) {
        targetProduct = { ...targetProduct, [key]: keys[key] };
      }
    }
    return targetProduct;
  }

  createProduct(newProduct: Product): Product[] {
    if (newProduct) {
      this.products.push({ ...newProduct, id: this.products.length });
    }
    return this.products;
  }

  /*
   * Delete a product by ID
   * @param id - The ID of the product to delete
   * @returns The updated list of products
   *
   * This method deletes a product by its ID.
   */
  deleteProductById(id: number) {
    let products = this.products.filter(
      (product: Product) => product.id !== id
    );
    return products;
  }
}
