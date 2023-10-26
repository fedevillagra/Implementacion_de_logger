import appRouter from "./router.js";
import { getCartViewController, getChatController, getProductsByIdViewController, getProductsViewsController, getRealTimeProductsController } from "../controllers/views.controller.js";

export default class ViewsProductsRouter extends appRouter {
  init(){
    this.get("/",["USER", "ADMIN"], getProductsViewsController);

    this.get("/realTimeProducts",["ADMIN"], getRealTimeProductsController);

    this.get("/chat",["USER"], getChatController);

    this.get("/product/:pid",["USER", "ADMIN"],
      getProductsByIdViewController
    );

    this.get("/carts/:cid",["USER", "ADMIN"], getCartViewController);
  }
}
