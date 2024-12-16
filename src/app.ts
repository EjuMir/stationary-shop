import express, { Application, Request, Response } from 'express'
const app : Application = express();
import cors from 'cors';

app.use(express.json());
app.use(cors())

const userRouter = express.Router()

app.get('/', (req:Request, res:Response) => {
  res.send('Hello world!')
})

export default app;