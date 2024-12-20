"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationaryModel = void 0;
const mongoose_1 = require("mongoose");
const stationarySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: String,
        enum: ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
        required: true
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    createdAt: { type: Number, default: Date.now() },
    updatedAt: { type: Number, default: Date.now() },
    isDeleted: { type: Boolean, default: false }
});
stationarySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
exports.StationaryModel = (0, mongoose_1.model)('Product', stationarySchema);
