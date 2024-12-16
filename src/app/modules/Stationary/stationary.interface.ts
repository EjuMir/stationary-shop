import { Schema, model, connect } from 'mongoose';

export type Stationary = {
    name: string,
    brand: string,
    price: number,
    category: 'Writing' | 'Office Supplies' | 'Art Supplies' | 'Educational' | 'Technology' //enum
    description: string,
    quantity: number,
    inStock: boolean
  }