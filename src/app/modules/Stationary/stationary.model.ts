import { Schema, model, connect } from 'mongoose';
import { Stationary } from './stationary.interface';


const stationarySchema = new Schema<Stationary>({
    name:{type: String, required:true},
    brand: {type: String , required:true},
    price:{
        type:Number,
        required:true,
        min: [0, 'Price Must be a positive number'],
        validate:{
            validator: function(value){
                return value >= 0;
            },
        message: `Price Must be a positive number`,
        },
        
    },
    category: {
        type : String,
        enum: ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
        required: true,
        message: "Category must be one of Writing, Office Supplies, Art Supplies, Educational, Technology"
    },
    description: {type: String, required:true},
    quantity: {type: Number, required:true, min:[0, 'Quantity cannot be less than 0']},
    inStock: {type: Boolean},
    createdAt: { type: String, default: new Date().toJSON() },
    updatedAt: { type: String, default: new Date().toJSON() },
    isDeleted: { type: Boolean, default: false }
})

stationarySchema.pre('find', function(next){
 this.find({isDeleted: {$ne: true}});
 next();
})

stationarySchema.pre('save', function(next){
    this.inStock = this.quantity > 0;
    next();
})

export const StationaryModel = model<Stationary>('Product', stationarySchema);