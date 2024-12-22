import { StationaryModel } from "../Stationary/stationary.model";
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

const createOrderInDB = async(productId:string, orderQuantity:number, orderData:Orders) => {
    try {
        const product = await StationaryModel.findById(productId);
        if (!product) {
          return { success: false, message: 'Product not found' };
        }
        if(product.isDeleted == true){
          return { success: false, message: 'Product is found' };
        }
        if (product.quantity < orderQuantity) {
            if(product.quantity === 0){
                return { success: false, message: 'Product out of stock' };
            }
          return { success: false, message: 'Insufficient quantity for the product' };
        }
        const order = await OrderModel.create(orderData);

        product.quantity -= orderQuantity;
        await product.save();
        return {
          success: true,
          message: 'Order placed successfully',
          data: order,
        };
      } catch (err:any) {
        return {
          success: false,
          message: err.message,
          stack: err.stack,
        };
      }
}


export const OrderService = {
    createOrderInDB,
    getSingleOrderByProductID,
    getAllOrdersFromDB,
};

