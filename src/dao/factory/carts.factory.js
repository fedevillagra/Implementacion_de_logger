import { PERSISTENCE } from "../../config/config.js";

export let Cart;

switch (PERSISTENCE) {
  case "MONGO":
    const { default: CartDAO } = await import("../carts.mongo.dao.js");
    Cart = CartDAO;
    break;
  default:
    break;
}
