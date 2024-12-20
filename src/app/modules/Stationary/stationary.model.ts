import { Schema, model, connect } from 'mongoose';
import { Stationary } from './stationary.interface';
import { OrderService } from '../Order/order.service';

const stationarySchema = new Schema<Stationary>({
    name:{type: String, required:true},
    brand: {type: String , required:true},
    price: {type: Number , required:true},
    category: {
        type : String,
        enum: ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
        required: true
    },
    description: {type: String, required:true},
    quantity: {type: Number, required:true},
    inStock: {type: Boolean, required:true},
    createdAt: { type: Number, default: Date.now() },
    updatedAt: { type: Number, default: Date.now() },
    isDeleted: { type: Boolean, default: false }
})

stationarySchema.pre('findOne', function(next){
 this.find({isDeleted: {$ne: true}});
 next();
})


export const StationaryModel = model<Stationary>('Product', stationarySchema);