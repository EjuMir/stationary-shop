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
exports.StationaryControllers = void 0;
const stationary_service_1 = require("./stationary.service");
const createStationaryProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: productData } = req.body;
        const result = yield stationary_service_1.StationaryProductServices.createStationaryProductInDB(productData);
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error creating product",
            error: err.message
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield stationary_service_1.StationaryProductServices.getAllProductFromDB();
        res.status(200).json({
            success: true,
            message: "All products retrieved successfully",
            data: products
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error retrieving products",
            error: err.message
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const product = yield stationary_service_1.StationaryProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: product
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "Product not found",
            error: err.message
        });
    }
});
const updateOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productMod = req.body;
        const productId = req.params.id;
        const updateProduct = yield stationary_service_1.StationaryProductServices.updateProductInDB(productId, productMod);
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updateProduct
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error updating product",
            error: err.message
        });
    }
});
const deleteOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const product = yield stationary_service_1.StationaryProductServices.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error deleting product",
            error: err.message
        });
    }
});
exports.StationaryControllers = {
    createStationaryProduct,
    getAllProduct,
    getSingleProduct,
    updateOneProduct,
    deleteOneProduct
};
