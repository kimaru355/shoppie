import { Router } from "express";
import {
  createProduct,
  createProducts,
  deleteProduct,
  getAllProducts,
  getProduct,
  getProductsByName,
  getProductsByType,
  updateProduct,
} from "../controllers/product.controller";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const ProductRouter = Router();

ProductRouter.post("/create", createProduct);
ProductRouter.post("/create-many", createProducts);
ProductRouter.put("/update", verifyAdmin, updateProduct);
ProductRouter.delete("/delete/:id", verifyAdmin, deleteProduct);
ProductRouter.get("/all", getAllProducts);
ProductRouter.get("/name/:productName", getProductsByName);
ProductRouter.get("/type/:productType", getProductsByType);
ProductRouter.get("/:id", getProduct);

export default ProductRouter;
