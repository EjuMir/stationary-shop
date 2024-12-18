import express from 'express'
import { StationaryControllers } from './stationary.controller';

const router = express.Router();

router.post('/products', StationaryControllers.createStationaryProduct)

router.get('/products', StationaryControllers.getAllProduct)

router.get('/products/:id', StationaryControllers.getSingleProduct)

router.put('/products/:id', StationaryControllers.updateOneProduct)

export const StationaryRoutes = router