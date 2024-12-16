import { Schema, model, connect } from 'mongoose';
import { Stationary } from './stationary.interface';

const stationarySchema = new Schema<Stationary>({
    name:{type: String},
    brand: {type: String},
    price: {type: Number},
    category: ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'], //enum
    description: {type: String},
    quantity: {type: Number},
    inStock: {type: Boolean}
})

export const StationaryModel = model<Stationary>('StationaryModel', stationarySchema);