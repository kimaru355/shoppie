import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByProductId,
  getOrdersByUserId,
  getCompletedOrders,
  getIncompleteOrders,
  getUserOrders,
} from "../controllers/order.controller";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const OrderRouter = Router();

OrderRouter.post("/create", createOrder);
OrderRouter.get("/completed", getCompletedOrders);
OrderRouter.get("/incomplete", getIncompleteOrders);
OrderRouter.get("/all", getAllOrders);
OrderRouter.get("/product/:productId", getOrdersByProductId);
OrderRouter.get("/user", getUserOrders);
OrderRouter.get("/users/:userId", verifyAdmin, getOrdersByUserId);

export default OrderRouter;
