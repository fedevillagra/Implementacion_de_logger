import { PERSISTENCE } from "../../config/config.js";

export let Product;

switch (PERSISTENCE) {
  case "MONGO":
    const { default: ProductDAO } = await import(
      "../products.mongo.dao.js"
    );
    Product = ProductDAO;
    break;
  default:
    break;
}
