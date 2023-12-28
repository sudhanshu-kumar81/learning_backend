import dotenv from 'dotenv';
dotenv.config({path:'./.env'})
import connectDB from './db/index.js'
import { app } from './app.js';
connectDB()
.then(()=>{
    app.on("error",(error)=>{
       
        console.log("error in then section is :");
        throw error;
    })
    app.listen(3000,()=>{
       
   console.log(`server is running at ${process.env.PORT}`)
    })
})
.catch((err)=>{
   
    console.log("mongo db connection failed!!",err);
})