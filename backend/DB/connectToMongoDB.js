import mongoose from "mongoose";


const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.log("error whil connecting to Mongo DB", error.message);
  }
};

export default connectToMongoDB