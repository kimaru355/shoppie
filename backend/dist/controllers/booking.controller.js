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
exports.getOrdersByUserId = exports.getOrdersByProductId = exports.getIncompleteOrders = exports.getCompletedOrders = exports.getAllOrders = exports.createOrder = void 0;
const uuid_1 = require("uuid");
const booking_service_1 = require("../services/booking.service");
const get_id_from_token_1 = require("../helpers/get_id_from_token");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingService = new booking_service_1.OrderService();
    const booking = req.body;
    booking.id = (0, uuid_1.v4)();
    booking.userId = (0, get_id_from_token_1.getIdFromToken)(req);
    if (!booking.userId) {
        return res.status(200).json({
            success: false,
            message: "Unauthorized",
            data: null,
        });
    }
    if (!booking.productId || !booking.bookingDate) {
        return res.status(200).json({
            success: false,
            message: "Invalid data",
            data: null,
        });
    }
    const response = yield bookingService.createOrder(booking);
    if (response.success) {
        return res.status(201).json(response);
    }
    else if (response.message !== "An error occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.createOrder = createOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingService = new booking_service_1.OrderService();
    const response = yield bookingService.getAllOrders();
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getAllOrders = getAllOrders;
const getCompletedOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingService = new booking_service_1.OrderService();
    const response = yield bookingService.getCompletedOrders();
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getCompletedOrders = getCompletedOrders;
const getIncompleteOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingService = new booking_service_1.OrderService();
    const response = yield bookingService.getIncompleteOrders();
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getIncompleteOrders = getIncompleteOrders;
const getOrdersByProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingService = new booking_service_1.OrderService();
    const productId = req.params.productId;
    const response = yield bookingService.getOrdersByProductId(productId);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getOrdersByProductId = getOrdersByProductId;
const getOrdersByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingService = new booking_service_1.OrderService();
    const userId = req.params.userId;
    const response = yield bookingService.getOrdersByUserId(userId);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getOrdersByUserId = getOrdersByUserId;
