import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    let DB_CONNECTION_STRING: string = "";
    if (process.env.NODE_ENV === "development") {
      DB_CONNECTION_STRING = process.env.MONGODB_LOCAL_URI!;
    }
    if (process.env.NODE_ENV === "production") {
      DB_CONNECTION_STRING = process.env.MONGODB_URI!;
    }
    const dbResponse = await mongoose.connect(DB_CONNECTION_STRING);
    console.log("db connected successfully", dbResponse.connection.host);
  } catch (error) {
    console.log("db connection error: ", error);
    process.exit(1);
  }
};
