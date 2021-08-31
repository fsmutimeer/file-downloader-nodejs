const mongoose = require('mongoose');
// const config = require('config');
// const db = config.get('mongoURI');

require("dotenv/config");

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            dbName:"download_db",
        });
        console.log('MongoDB connected...')
    }
    catch(err){
            console.error(err.message);
            console.log('dab could not be connected')
            //Exit with failure
            process.exit(1);
    }
}

module.exports = connectDB;