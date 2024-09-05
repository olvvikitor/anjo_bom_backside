import 'reflect-metadata';

import 'dotenv/config'

import express, { NextFunction, Request, Response } from 'express';
import connectDB from '@config/db/mongo_config'
import 'express-async-errors'
import cors from 'cors';
import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';
import routes from './routes';

// Middleware
const app = express();
connectDB();

app.use(cors());
app.use(express.json());


app.use(routes);
app.use(errors());
app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
  if (err instanceof AppError) {
   return res.status(err.statusCode).json({ status: 'error',
      message: err.message,
     }); 
  };
  console.log(err)
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server'
  })
});
app.listen(5000, ()=>{
  console.log('Server is running on port 5000');
  console.log('http://localhost:5000')
})

