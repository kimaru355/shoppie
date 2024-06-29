import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getProductsByName,
  updateProduct,
} from "../controllers/product.controller";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const ProductRouter = Router();

ProductRouter.post("/create", createProduct);
ProductRouter.put("/update", verifyAdmin, updateProduct);
ProductRouter.delete("/delete/:id", verifyAdmin, deleteProduct);
ProductRouter.get("/all", getAllProducts);
ProductRouter.get("/name/:productName", getProductsByName);
ProductRouter.get("/tour_type/:tourType", getProductsByName);
ProductRouter.get("/:id", getProduct);

export default ProductRouter;
