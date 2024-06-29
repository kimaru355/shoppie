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
exports.ProductService = void 0;
const client_1 = require("@prisma/client");
class ProductService {
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.product.create({
                    data: product,
                });
                return {
                    success: true,
                    message: "Product successfully created",
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
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.product.update({
                    where: {
                        id: product.id,
                    },
                    data: product,
                });
                return {
                    success: true,
                    message: "Product successfully updated",
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
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.product.update({
                    where: {
                        id: id,
                        isDeleted: false,
                    },
                    data: {
                        isDeleted: true,
                    },
                });
                return {
                    success: true,
                    message: "Product successfully deleted",
                    data: null,
                };
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (error.message.includes("Record to update not found")) {
                        return {
                            success: false,
                            message: "Product not found",
                            data: null,
                        };
                    }
                }
                return {
                    success: false,
                    message: "An Error Occurred",
                    data: null,
                };
            }
        });
    }
    getProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.prisma.product.findUnique({
                    where: {
                        id: productId,
                        isDeleted: false,
                    },
                });
                if (!product) {
                    return {
                        success: false,
                        message: "Product not found",
                        data: null,
                    };
                }
                delete product.isDeleted;
                return {
                    success: true,
                    message: "Product found",
                    data: product,
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
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.prisma.product.findMany({
                    where: {
                        isDeleted: false,
                    },
                });
                products.forEach((product) => {
                    delete product.isDeleted;
                });
                return {
                    success: true,
                    message: "Products found",
                    data: products,
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
    getProductsByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.prisma.product.findMany({
                    where: {
                        type: type,
                        isDeleted: false,
                    },
                });
                return {
                    success: true,
                    message: "Products found",
                    data: products,
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
    getProductsByName(productName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.prisma.product.findMany({
                    where: {
                        isDeleted: false,
                        name: {
                            contains: productName,
                        },
                    },
                });
                return {
                    success: true,
                    message: "Products found",
                    data: products,
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
exports.ProductService = ProductService;
