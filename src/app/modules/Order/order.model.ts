import { Schema, model, connect } from 'mongoose';
import { Orders } from './order.interface';
import { StationaryProductServices } from '../Stationary/stationary.service';

const OrderSchema = new Schema<Orders>({
    email:{type: String, required:true},
    product: {type: String , required:true},
    quantity: {type: Number, required:true},
    totalPrice: {type: Number , required:true},
    createdAt: { type: Number, default: Date.now() },
    updatedAt: { type: Number, default: Date.now() },
})

OrderSchema.post('save', async function(doc, next) {
    try {
        const { product, quantity } = doc;
        const productFromStationary = await StationaryProductServices.getSingleProductFromDB(product);
        
        if (!productFromStationary) {
            throw new Error(`Product with ID ${product} not found`);
        }
        else if (productFromStationary.quantity < quantity) {
            throw new Error(`Product with ID ${product} is out of stock`);
        }
        else if(productFromStationary.quantity > quantity){
            productFromStationary.quantity -= quantity;
            await productFromStationary.save();
        }
        next();
    } catch(error:any) {
        next(error);
    }
});

export const OrderModel = model<Orders>('Order', OrderSchema);