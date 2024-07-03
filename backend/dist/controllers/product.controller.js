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
exports.getProductsByName = exports.getProductsByTourType = exports.getAllProducts = exports.getProduct = exports.deleteProduct = exports.updateProduct = exports.createProducts = exports.createProduct = void 0;
const product_service_1 = require("../services/product.service");
const uuid_1 = require("uuid");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productService = new product_service_1.ProductService();
    const productInput = req.body;
    const product = Object.assign(Object.assign({}, productInput), { images: productInput.images.join(":::::") });
    product.id = (0, uuid_1.v4)();
    if (!product.id ||
        !product.name ||
        !product.price ||
        !product.description ||
        !product.type ||
        !product.size ||
        !product.quantity ||
        !product.stockLimit ||
        !product.images) {
        return res.status(200).json({
            success: false,
            message: "Invalid data",
            data: null,
        });
    }
    const response = yield productService.createProduct(product);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.createProduct = createProduct;
const createProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productService = new product_service_1.ProductService();
    const productsInput = req.body;
    const products = productsInput.map((productInput) => {
        return Object.assign(Object.assign({}, productInput), { images: productInput.images.join(":::::") });
    });
    products.filter((product) => product.name &&
        product.price &&
        product.description &&
        product.type &&
        product.size &&
        product.quantity &&
        product.stockLimit &&
        product.images);
    products.forEach((product) => {
        product.id = (0, uuid_1.v4)();
    });
    const response = yield productService.createProducts(products);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.createProducts = createProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productService = new product_service_1.ProductService();
    const productImagesArray = req.body;
    const product = Object.assign(Object.assign({}, productImagesArray), { images: productImagesArray.images.join(":::::") });
    const response = yield productService.updateProduct(product);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productService = new product_service_1.ProductService();
    const id = req.params.id;
    if (!id) {
        return res.status(200).json({
            success: false,
            message: "Please provide an id",
            data: null,
        });
    }
    const response = yield productService.deleteProduct(id);
    if (response.success) {
        return res.status(200).json(response);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.deleteProduct = deleteProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productService = new product_service_1.ProductService();
    const id = req.params.id;
    const response = yield productService.getProduct(id);
    if (response.success && response.data) {
        const updatedResponse = Object.assign(Object.assign({}, response), { data: Object.assign(Object.assign({}, response.data), { images: response.data.images.split(":::::") }) });
        return res.status(200).json(updatedResponse);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getProduct = getProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productService = new product_service_1.ProductService();
    const response = yield productService.getAllProducts();
    if (response.success && response.data) {
        const updatedResponse = {
            success: response.success,
            message: response.message,
            data: response.data.map((product) => {
                return Object.assign(Object.assign({}, product), { images: product.images.split(":::::") });
            }),
        };
        return res.status(200).json(updatedResponse);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getAllProducts = getAllProducts;
const getProductsByTourType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productService = new product_service_1.ProductService();
    const productType = req.params.productType;
    const response = yield productService.getProductsByType(productType);
    if (response.success && response.data) {
        const updatedResponse = {
            success: response.success,
            message: response.message,
            data: response.data.map((product) => {
                return Object.assign(Object.assign({}, product), { images: product.images.split(":::::") });
            }),
        };
        return res.status(200).json(updatedResponse);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getProductsByTourType = getProductsByTourType;
const getProductsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productService = new product_service_1.ProductService();
    const productName = req.params.productName;
    const response = yield productService.getProductsByName(productName);
    if (response.success && response.data) {
        const updatedResponse = {
            success: response.success,
            message: response.message,
            data: response.data.map((product) => {
                return Object.assign(Object.assign({}, product), { images: product.images.split(":::::") });
            }),
        };
        return res.status(200).json(updatedResponse);
    }
    else if (response.message !== "An Error Occurred") {
        return res.status(200).json(response);
    }
    return res.status(200).json(response);
});
exports.getProductsByName = getProductsByName;
