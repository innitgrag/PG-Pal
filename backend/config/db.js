const mongoose = require('mongoose')

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connect");

    }catch(error){
        console.error("MongoDB connection failer", error);
        process.exit(1)
    }
};
module.exports = connectDB;


