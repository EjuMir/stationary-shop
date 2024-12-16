"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationaryModel = void 0;
const mongoose_1 = require("mongoose");
const stationarySchema = new mongoose_1.Schema({
    name: { type: String },
    brand: { type: String },
    price: { type: Number },
    category: ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'], //enum
    description: { type: String },
    quantity: { type: Number },
    inStock: { type: Boolean }
});
exports.StationaryModel = (0, mongoose_1.model)('StationaryModel', stationarySchema);
