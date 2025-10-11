const mongoose = require("mongoose");

async function connectDb() {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://mishrameet143:zeRa01X5wZTATuno@cluster0.klh6t.mongodb.net/devTinder"
    );
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
}
module.exports = { connectDb };
