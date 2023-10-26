import { uploader } from "../utils/utils.js";
import {
  addProductsController,
  deleteProductsController,
  getProductsByIdController,
  getProductsController,
  updateProductsController,
} from "../controllers/products.controller.js";
import appRouter from "./router.js";

export default class ProductsRouter extends appRouter {
  init() {
    this.get("/", [/* "USER", "ADMIN" */"PUBLIC"], getProductsController);

    this.get("/:pid", ["USER", "ADMIN"], getProductsByIdController);

    this.post("/", ["ADMIN"], uploader.single("file"), addProductsController);

    this.put("/:pid", ["ADMIN"], updateProductsController);

    this.delete("/:pid", ["ADMIN"], deleteProductsController);
  }
}
