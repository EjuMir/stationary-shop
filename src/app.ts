import express, { Application, Request, Response } from 'express'
const app : Application = express();
import cors from 'cors';
import { StationaryRoutes } from './app/modules/Stationary/stationary.route';
import { OrderProductRouter } from './app/modules/Order/order.route';


app.use(express.json());
app.use(cors());

app.use('/api', StationaryRoutes)
app.use('/api/orders', OrderProductRouter)

app.get('/', (req:Request, res:Response) => {
  res.send('Hello world!')
})

export default app;