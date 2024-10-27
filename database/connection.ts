import * as mongoose from "mongoose";

const MONGODB_KEY = process.env.MONGODB_KEY || "mongodb+srv://alihamza:A03063099643@ggcb.bb72e.mongodb.net/?retryWrites=true&w=majority&appName=ggcb";

const databaseConnection = async () => {
  try {
    await mongoose.connect(MONGODB_KEY, {
      dbName: "ggcb-attendance",
    });
    console.log("Database connection established");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error connecting to database:", error.message);
    }
  }
};

export default databaseConnection;
