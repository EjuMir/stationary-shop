"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationaryModel = void 0;
const mongoose_1 = require("mongoose");
const stationarySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price Must be a positive number'],
        validate: {
            validator: function (value) {
                return value >= 0;
            },
            message: `Price Must be a positive number`,
        },
    },
    category: {
        type: String,
        enum: ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
        required: true,
        message: "Category must be one of Writing, Office Supplies, Art Supplies, Educational, Technology"
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: [0, 'Quantity cannot be less than 0'] },
    inStock: { type: Boolean },
    createdAt: { type: String, default: new Date().toJSON() },
    updatedAt: { type: String, default: new Date().toJSON() },
    isDeleted: { type: Boolean, default: false }
});
stationarySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
stationarySchema.pre('save', function (next) {
    this.inStock = this.quantity > 0;
    next();
});
exports.StationaryModel = (0, mongoose_1.model)('Product', stationarySchema);
