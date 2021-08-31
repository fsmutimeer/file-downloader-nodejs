const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const uploadSchema = new Schema({

    filename:{
        type:String,
        required:true
    },
    path:{
        type:String,

    },
    size:{
        type:String,
    },
    uuid: {
        type:String,
    }

},{timestamps:true})

const File = mongoose.model('File', uploadSchema);

module.exports = File;
