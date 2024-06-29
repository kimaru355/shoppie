import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByProductId,
  getOrdersByUserId,
  getCompletedOrders,
  getIncompleteOrders,
} from "../controllers/order.controller";

const OrderRouter = Router();

OrderRouter.post("/create", createOrder);
OrderRouter.get("/completed", getCompletedOrders);
OrderRouter.get("/incomplete", getIncompleteOrders);
OrderRouter.get("/all", getAllOrders);
OrderRouter.get("/product/:productId", getOrdersByProductId);
OrderRouter.get("/user/:userId", getOrdersByUserId);

export default OrderRouter;
