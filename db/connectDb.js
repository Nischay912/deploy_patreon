// step239: we now copy code form google to connect to database using mongoose and paste here below.
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // step240: update the database name from "test" of documentation code to "juice" database that we want to connect to here now.
    const conn = await mongoose.connect(`mongodb://localhost:27017/juice`, { 
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

// step241: export to use this in route.js file now ; see next steps there.
export default connectDb;
