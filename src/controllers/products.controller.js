import { ProductService } from "../services/products.service.js";
import { devLogger } from "../utils/logger.js";

export const getProductsController = async (req, res) => {
  try {
    const result = await ProductService.getAll();
    return res.sendSuccess(result);
  } catch (error) {
    devLogger.error(error);
    return res.sendServerError(error.message);
  }
};

export const getProductsByIdController = async (req, res) => {
  try {
    const pid = req.params.pid;
    const result = await ProductService.getById(pid);
    if (!result) return res.sendRequestError("The product does not exist");
    res.sendSuccess(result);
  } catch (error) {
    devLogger.error(error);
    res.sendServerError(error.message);
  }
};

export const addProductsController = async (req, res) => {
  try {
    if (!req.file) {
      devLogger.info("No image");
    }
    if (!req.body)
      return res.sendUserError("Product no can be created without properties");

    let product = {
      title: req.body.title,
      description: req.body.description,
      price: parseFloat(req.body.price),
      thumbnails: [req?.file?.originalname] || [],
      code: req.body.code,
      category: req.body.category,
      stock: parseInt(req.body.stock),
    };

    const result = await ProductService.create(product);
    const products = await ProductService.getAll();
    req.app.get("socketio").emit("updatedProducts", products);
    res.createdSuccess(result);
  } catch (error) {
    devLogger.error(error);
    return res.sendServerError(error.message);
  }
};

export const updateProductsController = async (req, res) => {
  try {
    const pid = req.params.pid;
    if (req.body._id === pid) return sendUserError("Cannot modify product id");
    const updated = req.body;
    const productFind = await ProductService.getById(pid);
    if (!productFind) return sendRequestError("The product does not exist");
    await ProductService.update(pid, updated);

    const products = await ProductService.getAll();
    req.app.get("socketio").emit("updatedProducts", products);

    res.sendSuccess(products);
  } catch (error) {
    devLogger.error(error);
    res.sendServerError(error);
  }
};

export const deleteProductsController = async (req, res) => {
  try {
    const pid = req.params.pid;
    const result = await ProductService.delete(pid);
    if (!result) return res.sendRequestError(`No such product with id: ${pid}`);

    const products = await ProductService.getAll();
    req.app.get("socketio").emit("updatedProducts", products);

    res.sendSuccess(products);
  } catch (error) {
    devLogger.error(error);
    return res.sendServerError(error.message);
  }
};
