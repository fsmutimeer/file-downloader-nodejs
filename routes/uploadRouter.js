const uploadRouter = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
require('dotenv/config');
const {v4: uuid4} = require('uuid');


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename:(req, file, cb)=>{
        const uniquiName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${path.extname(file.originalname)}`;
        cb(null, uniquiName); 
    }
})

const uploads = multer({
    storage,
    limits:{fileSize: 100000 * 100},   
}).single('filename');


uploadRouter.post('/',uploads, async (req, res)=>{
   try {

    //check if the file exists
    if(!req.file)
    {
        return res.status(404).json('File does not exits');
    }
    //store file

    var file = new File({

        filename:req.file.filename,
        path:req.file.path,
        size:req.file.size,
        uuid:uuid4()
    });

    file = await file.save();
    
    if(file){
        console.log(process.env.APP_BASE_URL)
        return res.status(201).send({file:`http://localhost:3002/files/${file.uuid}`});
    }
    //response
   } catch (error) {
       console.error(error)
       return res.status(500).send('file could not be uploaded');
   }

})


module.exports = uploadRouter;