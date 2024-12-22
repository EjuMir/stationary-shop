import { Schema, model, connect } from 'mongoose';
import { Orders } from './order.interface';

const OrderSchema = new Schema<Orders>({
    email:{type: String, required:true},
    product: {type: String , required:true},
    quantity: {type: Number, required:true, min:[0, 'Quantity cannot be less than 1']},
    totalPrice: {type: Number , required:true},
    createdAt:{type:String, default: new Date().toJSON()},
    updatedAt:{type:String, default: new Date().toJSON()}
}) 

export const OrderModel = model<Orders>('Order', OrderSchema);