import dotenv from 'dotenv';
dotenv.config({path:'./db'})
import connectDB from './db/index.js'
import { app } from './app.js';
connectDB()
.then(()=>{
     
    app.on("error",(error)=>{
        console.log("error :",error);
        throw error;
    })
    app.listen(process.env.PORT||8000,()=>{
   console.log(`server is running at ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("mongo db connection failed!!");
})