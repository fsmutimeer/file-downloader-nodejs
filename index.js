const express = require("express");
const morgan = require("morgan");
require('dotenv').config;
const connectDB = require("./config/db");
const app = express();



const port = process.env.PORT || 3000;
api = process.env.api;
console.log(api)

//database
connectDB();
//import routers
const uploadRouter = require('./routes/uploadRouter');
const showRouter = require('./routes/showRouter.js');
const downloadRouter = require('./routes/downloadRouter');
//routes middleware
// app.use(express.static('uploads'))
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(`${api}/uploads`, uploadRouter);
app.use('/', showRouter);
app.use('/files/download', downloadRouter);

app.listen(port, ()=>{
    console.log(`server is running at: ${port}`)
})