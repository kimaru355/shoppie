"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const CartRouter = (0, express_1.Router)();
CartRouter.post("/add", cart_controller_1.addToCart);
CartRouter.get("/all", cart_controller_1.getCart);
CartRouter.delete("/delete/all", cart_controller_1.emptyCart);
CartRouter.delete("/delete/:id", cart_controller_1.deleteFromCart);
CartRouter.put("/increment/:id", cart_controller_1.incrementCartItem);
CartRouter.put("/decrement/:id", cart_controller_1.decrementCartItem);
exports.default = CartRouter;
