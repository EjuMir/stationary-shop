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
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const stationary_service_1 = require("../Stationary/stationary.service");
const OrderSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Number, default: Date.now() },
    updatedAt: { type: Number, default: Date.now() },
});
OrderSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { product, quantity } = doc;
            console.log(doc);
            const productFromStationary = yield stationary_service_1.StationaryProductServices.getSingleProductFromDB(product);
            if (!productFromStationary) {
                throw new Error(`Product with ID ${product} not found`);
            }
            else if (productFromStationary.quantity < quantity) {
                throw new Error(`Product with ID ${product} is out of stock`);
            }
            else if (productFromStationary.quantity > quantity) {
                productFromStationary.quantity -= quantity;
                yield productFromStationary.save();
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
exports.OrderModel = (0, mongoose_1.model)('Order', OrderSchema);
