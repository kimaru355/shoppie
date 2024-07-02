"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrementCartItem = exports.incrementCartItem = exports.emptyCart = exports.deleteFromCart = exports.getCart = exports.addToCart = void 0;
const uuid_1 = require("uuid");
const get_id_from_token_1 = require("../helpers/get_id_from_token");
const cart_service_1 = require("../services/cart.service");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = req.body;
    if (!cart.productId && cart.productNumber) {
        return res.status(200).json({
            success: false,
            message: "Invalid data",
            data: null,
        });
    }
    cart.userId = (0, get_id_from_token_1.getIdFromToken)(req);
    if (!cart.userId) {
        return res.status(200).json({
            success: false,
            message: "Unauthorized",
            data: null,
        });
    }
    cart.id = (0, uuid_1.v4)();
    const cartService = new cart_service_1.CartService();
    cart.userId = (0, get_id_from_token_1.getIdFromToken)(req);
    cart.id = (0, uuid_1.v4)();
    const response = yield cartService.addToCart(cart);
    if (response.success) {
        return res.status(201).json(response);
    }
    return res.status(200).json(response);
});
exports.addToCart = addToCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, get_id_from_token_1.getIdFromToken)(req);
    if (!userId) {
        return res.status(200).json({
            success: false,
            message: "Unauthorized",
            data: null,
        });
    }
    const cartService = new cart_service_1.CartService();
    const response = yield cartService.getCart(userId);
    if (response.success) {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getCart = getCart;
const deleteFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        return res.status(200).json({
            success: false,
            message: "Invalid data",
            data: null,
        });
    }
    const cartService = new cart_service_1.CartService();
    const response = yield cartService.deleteFromCart(id);
    if (response.success) {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.deleteFromCart = deleteFromCart;
const emptyCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, get_id_from_token_1.getIdFromToken)(req);
    if (!userId) {
        return res.status(200).json({
            success: false,
            message: "Unauthorized",
            data: null,
        });
    }
    const cartService = new cart_service_1.CartService();
    const response = yield cartService.emptyCart(userId);
    if (response.success) {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.emptyCart = emptyCart;
const incrementCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        return res.status(200).json({
            success: false,
            message: "Invalid data",
            data: null,
        });
    }
    const cartService = new cart_service_1.CartService();
    const response = yield cartService.incrementCartItem(id);
    if (response.success) {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.incrementCartItem = incrementCartItem;
const decrementCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        return res.status(200).json({
            success: false,
            message: "Invalid data",
            data: null,
        });
    }
    const cartService = new cart_service_1.CartService();
    const response = yield cartService.decrementCartItem(id);
    if (response.success) {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.decrementCartItem = decrementCartItem;
