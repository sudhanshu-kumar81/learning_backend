import dotenv from 'dotenv';
dotenv.config({path:'./db'})
import connectDB from './db/index.js'
connectDB();