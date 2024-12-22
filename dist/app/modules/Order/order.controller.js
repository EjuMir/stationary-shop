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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const order_model_1 = require("./order.model");
const getSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const singleOrder = yield order_service_1.OrderService.getSingleOrderByProductID(productId);
        res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: singleOrder
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching order",
            error: err.message
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_service_1.OrderService.getAllOrdersFromDB();
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching orders",
            error: err.message
        });
    }
});
const createProductOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { order: orderData } = req.body;
    try {
        const result = yield order_service_1.OrderService.createOrderInDB(orderData.product, orderData.quantity, orderData);
        if (result.success) {
            res.status(200).json({
                message: result.message,
            });
        }
        else {
            res.status(404).json({
                message: result.message,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err.message,
            stack: err.stack,
        });
    }
});
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.OrderModel.aggregate([
            {
                $addFields: {
                    "productObjectId": { $toObjectId: "$product" }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productObjectId',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            {
                $unwind: '$productDetails',
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: {
                            $multiply: ['$quantity', '$productDetails.price'],
                        },
                    },
                },
            },
        ]);
        const totalRevenue = orders[0] ? orders[0].totalRevenue : 0;
        res.status(200).json({
            message: 'Revenue calculated successfully',
            success: true,
            data: { totalRevenue: totalRevenue },
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Error calculating revenue',
            success: false,
            error: err,
            stack: err.stack,
        });
    }
});
exports.OrderController = {
    getSingleOrder,
    getAllOrders,
    createProductOrder,
    calculateRevenue
};
