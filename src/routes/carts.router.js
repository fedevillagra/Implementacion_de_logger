import appRouter from "./router.js";
import {
  addCartController,
  addProductToCartController,
  deleteCartController,
  deleteProductInCartController,
  getCartController,
  getPurchaseController,
  updateProductToCartController,
  updatedCartController,
} from "../controllers/carts.controller.js";

export default class CartsRouter extends appRouter {
  init() {
    this.post("/", ["USER", "ADMIN"], addCartController);

    this.post("/:cid/product/:pid", ["USER"], addProductToCartController);

    this.get("/:cid", ["USER", "ADMIN"], getCartController);

    this.put("/:cid/product/:pid", ["USER", "ADMIN"], updateProductToCartController);

    this.put("/:cid", ["USER", "ADMIN"], updatedCartController);

    this.delete("/:cid", ["USER", "ADMIN"], deleteCartController);

    this.delete("/:cid/product/:pid", ["USER"], deleteProductInCartController);

    this.get("/:cid/purchase", ["USER"], getPurchaseController);
  }
}
