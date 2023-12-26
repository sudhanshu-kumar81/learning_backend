import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`mongo DB connected !! DB HOST : ${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("mongoose connection failed",error);
        console.error(error.stack);
        process.exit(1);
    }
}
export default connectDB