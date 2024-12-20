import { Orders } from "./order.interface";
import { OrderModel } from "./order.model";

const getSingleOrderByProductID = async(id:string)=>{
    const singleOrder = await OrderModel.findOne({product:id});
    return singleOrder;
}

const getAllOrdersFromDB = async () => {
    const orders = await OrderModel.find();
    return orders;
}

const createOrderInDB = async (orderData: Orders) => {
    const result = await OrderModel.create(orderData);
    return result;
}



export const OrderService = {
    createOrderInDB,
    getSingleOrderByProductID,
    getAllOrdersFromDB,
};

