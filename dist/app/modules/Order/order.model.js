"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true, min: [0, 'Quantity cannot be less than 1'] },
    totalPrice: { type: Number, required: true },
    createdAt: { type: String, default: new Date().toJSON() },
    updatedAt: { type: String, default: new Date().toJSON() }
});
exports.OrderModel = (0, mongoose_1.model)('Order', OrderSchema);
