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
exports.CartService = void 0;
const client_1 = require("@prisma/client");
class CartService {
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    addToCart(cartItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.prisma.product.findUnique({
                    where: {
                        id: cartItem.productId,
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
                const prevCartItem = yield this.prisma.cart.findFirst({
                    where: {
                        productId: cartItem.productId,
                        userId: cartItem.userId,
                    },
                });
                if (prevCartItem) {
                    return {
                        success: false,
                        message: "Product already in cart",
                        data: null,
                    };
                }
                if (product.quantity < cartItem.productNumber) {
                    return {
                        success: false,
                        message: "Product quantity cannot be more than available quantity",
                        data: null,
                    };
                }
                yield this.prisma.cart.create({
                    data: cartItem,
                });
                return {
                    success: true,
                    message: "Item successfully added to cart",
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
    getCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartItems = yield this.prisma.cart.findMany({
                    where: {
                        userId: userId,
                    },
                });
                if (!cartItems) {
                    return {
                        success: false,
                        message: "Cart is empty",
                        data: null,
                    };
                }
                const products = yield this.prisma.product.findMany({
                    where: {
                        id: {
                            in: cartItems.map((item) => item.productId),
                        },
                    },
                });
                const cart = cartItems.map((item) => {
                    const product = products.find((p) => p.id === item.productId);
                    return {
                        id: item.id,
                        product: product,
                        productNumber: item.productNumber,
                    };
                });
                return {
                    success: true,
                    message: "Cart successfully retrieved",
                    data: cart,
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
    deleteFromCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.cart.delete({
                    where: {
                        id: id,
                    },
                });
                return {
                    success: true,
                    message: "Item successfully removed from cart",
                    data: null,
                };
            }
            catch (error) {
                if (error.message.includes("Record to delete does not exist.")) {
                    return {
                        success: false,
                        message: "item not found in cart",
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
    emptyCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.cart.deleteMany({
                    where: {
                        userId: userId,
                    },
                });
                return {
                    success: true,
                    message: "Cart successfully emptied",
                    data: null,
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
    incrementCartItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartItem = yield this.prisma.cart.findUnique({
                    where: {
                        id: id,
                    },
                });
                if (!cartItem) {
                    return {
                        success: false,
                        message: "Product not in cart",
                        data: null,
                    };
                }
                const product = yield this.prisma.product.findUnique({
                    where: {
                        id: cartItem.productId,
                    },
                });
                if (!product) {
                    return {
                        success: false,
                        message: "Product does not exist",
                        data: null,
                    };
                }
                if (cartItem.productNumber + 1 >= product.quantity) {
                    return {
                        success: false,
                        message: "Product quantity cannot be more than available quantity",
                        data: null,
                    };
                }
                cartItem.productNumber += 1;
                yield this.prisma.cart.update({
                    where: {
                        id: cartItem.id,
                    },
                    data: cartItem,
                });
                return {
                    success: true,
                    message: "Product quantity successfully incremented",
                    data: null,
                };
            }
            catch (_a) {
                return {
                    success: false,
                    message: "An error occurred",
                    data: null,
                };
            }
        });
    }
    decrementCartItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartItem = yield this.prisma.cart.findUnique({
                    where: {
                        id: id,
                    },
                });
                if (!cartItem) {
                    return {
                        success: false,
                        message: "Product not in cart",
                        data: null,
                    };
                }
                if (cartItem.productNumber < 2) {
                    return {
                        success: false,
                        message: "Product quantity cannot be less than 1",
                        data: null,
                    };
                }
                cartItem.productNumber -= 1;
                yield this.prisma.cart.update({
                    where: {
                        id: cartItem.id,
                    },
                    data: cartItem,
                });
                return {
                    success: true,
                    message: "Product quantity successfully decremented",
                    data: null,
                };
            }
            catch (_a) {
                return {
                    success: false,
                    message: "An error occurred",
                    data: null,
                };
            }
        });
    }
}
exports.CartService = CartService;
