const mongoose = require('mongoose');
const dbConnectionString = "mongodb+srv://djole:djole@cluster0.gnxib.gcp.mongodb.net/Inventar?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(dbConnectionString,{
        useNewUrlParser: true
      }
    );

    console.log('MongoDB is Connected...');
    //TODO continue here....

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;