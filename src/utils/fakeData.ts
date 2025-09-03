import { faker } from "@faker-js/faker";
import { Product } from "../interfaces";

export const fakeUserData = () => {
  return Array.from({ length: 10 }).map(
    (_, idx): Product => ({
      id: Number(idx),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      description: faker.commerce.productDescription(),
      imageURL: faker.image.urlPicsumPhotos(),
    })
  );
};
