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
exports.OrderService = void 0;
const client_1 = require("@prisma/client");
class OrderService {
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.prisma.product.findUnique({
                    where: {
                        id: order.productId,
                        isDeleted: false,
                    },
                });
                if (!product) {
                    return {
                        success: false,
                        message: "Product does not exist",
                        data: null,
                    };
                }
                yield this.prisma.order.create({
                    data: order,
                });
                return {
                    success: true,
                    message: "Order successfully created",
                    data: null,
                };
            }
            catch (error) {
                if (error.message.includes("Foreign key constraint failed")) {
                    return {
                        success: false,
                        message: "Invalid Product or User Id",
                        data: null,
                    };
                }
                return {
                    success: false,
                    message: "An Error Occurred",
                    data: null,
                };
            }
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.prisma.order.findMany();
                return {
                    success: true,
                    message: "Orders successfully retrieved",
                    data: orders,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "An Error Occurred",
                    data: null,
                };
            }
        });
    }
    getCompletedOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.prisma.order.findMany({
                    where: {
                        isOrderCompleted: true,
                    },
                });
                return {
                    success: true,
                    message: "Completed orders successfully retrieved",
                    data: orders,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "An Error Occurred",
                    data: null,
                };
            }
        });
    }
    getIncompleteOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.prisma.order.findMany({
                    where: {
                        isOrderCompleted: false,
                    },
                });
                return {
                    success: true,
                    message: "Incomplete orders successfully retrieved",
                    data: orders,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "An Error Occurred",
                    data: null,
                };
            }
        });
    }
    getOrdersByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.prisma.order.findMany({
                    where: {
                        productId: productId,
                    },
                });
                return {
                    success: true,
                    message: "Orders successfully retrieved",
                    data: orders,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "An Error Occurred",
                    data: null,
                };
            }
        });
    }
    getOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.prisma.order.findMany({
                    where: {
                        userId: userId,
                    },
                });
                return {
                    success: true,
                    message: "Orders successfully retrieved",
                    data: orders,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "An Error Occurred",
                    data: null,
                };
            }
        });
    }
}
exports.OrderService = OrderService;
