import mongoose from "mongoose";

const db = async () => {
  try {
    if (!process.env.MONGO_URI) return console.log("Mongo URI not found.");
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    return console.log("MongoDb error : ", error);
  }
};
export default db;
