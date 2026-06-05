import mongoose from "mongoose";
import { seedDatabase } from "./seeder.js";

const connectDB=async(req,res)=>{
    try
    {
         const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ROOM-MGMT';
         await mongoose.connect(mongoURI).then(async ()=>{
            console.log("database connected")
            await seedDatabase();
         }).catch((err)=>{
            console.log("database not connected due to",err)
         })  
    }
    catch(err)
    {
         console.log("database not connected due to",err)
    }

}

export default connectDB