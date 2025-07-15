import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const connectingToDB = await mongoose.connect(`${process.env.MONGODB_URI}wealthGrid`)
        console.log("Connected to MongoDB:", connectingToDB.connection.host);
    } catch (error:any) {
     console.log("Error connecting to MongoDB:", error);
    }
}

export default connectDB;