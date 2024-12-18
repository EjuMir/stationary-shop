import { Schema, model, connect } from 'mongoose';
import { Stationary } from './stationary.interface';

const stationarySchema = new Schema<Stationary>({
    name:{type: String, required:true},
    brand: {type: String , required:true},
    price: {type: Number , required:true},
    category: ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'], //enum
    description: {type: String, required:true},
    quantity: {type: Number, required:true},
    inStock: {type: Boolean, required:true},
    createdAt: { type: Number, default: Date.now() },
    updatedAt: { type: Number, default: Date.now() }
})

export const StationaryModel = model<Stationary>('Product', stationarySchema);