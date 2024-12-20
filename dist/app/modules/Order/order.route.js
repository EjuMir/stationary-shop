"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductRouter = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const orderRouter = (0, express_1.Router)();
orderRouter.get('/revenue', order_controller_1.OrderController.calculateRevenue);
orderRouter.get('/:id', order_controller_1.OrderController.getSingleOrder);
orderRouter.get('/', order_controller_1.OrderController.getAllOrders);
orderRouter.post('/', order_controller_1.OrderController.createProductOrder);
exports.OrderProductRouter = orderRouter;
