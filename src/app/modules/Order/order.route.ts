import { Router } from "express";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

const orderRouter = Router();

orderRouter.get('/revenue', OrderController.calculateRevenue)
orderRouter.get('/:id', OrderController.getSingleOrder);
orderRouter.get('/', OrderController.getAllOrders);
orderRouter.post('/', OrderController.createProductOrder);


export const OrderProductRouter = orderRouter;



