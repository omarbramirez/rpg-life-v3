const mongoose = require('mongoose');
require('dotenv/config')

const databaseUrl = process.env.DB_URI

const connectDatabase = async()=>{
    try{
        await mongoose.connect(databaseUrl);
        console.log('Database connection succeeded uwu');
    }catch (err){
        console.error('Database connection failed:', err);
        process.exit(1);
    }
}

module.exports = connectDatabase;

