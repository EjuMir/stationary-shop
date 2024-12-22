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
const stationary_model_1 = require("../Stationary/stationary.model");
const order_model_1 = require("./order.model");
const getSingleOrderByProductID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleOrder = yield order_model_1.OrderModel.findOne({ product: id });
    return singleOrder;
});
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.OrderModel.find();
    return orders;
});
const createOrderInDB = (productId, orderQuantity, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield stationary_model_1.StationaryModel.findById(productId);
        if (!product) {
            return { success: false, message: 'Product not found' };
        }
        if (product.isDeleted == true) {
            return { success: false, message: 'Product is found' };
        }
        if (product.quantity < orderQuantity) {
            if (product.quantity === 0) {
                return { success: false, message: 'Product out of stock' };
            }
            return { success: false, message: 'Insufficient quantity for the product' };
        }
        const order = yield order_model_1.OrderModel.create(orderData);
        product.quantity -= orderQuantity;
        yield product.save();
        return {
            success: true,
            message: 'Order placed successfully',
            data: order,
        };
    }
    catch (err) {
        return {
            success: false,
            message: err.message,
            stack: err.stack,
        };
    }
});
exports.OrderService = {
    createOrderInDB,
    getSingleOrderByProductID,
    getAllOrdersFromDB,
};
