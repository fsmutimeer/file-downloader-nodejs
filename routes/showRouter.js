const showRouter = require('express').Router();
const File = require('../models/file');

showRouter.get('/:uuid', async (req, res)=>{

    try {

    const file = await File.findOne({uuid:req.params.uuid});
    if(!file){
        return res.status(404).send('file not found')
    }
    return res.json({
        uuid:file.uuid,
        fileName:file.fileName,
        fileSize: `${parseInt(file.size / 1000)}-KB`,
        downloadLink: `http://localhost:3002/files/download/${file.uuid}`
    });


    } 
    catch (error) {
        if(error.kind ==='ObjectId')
        {
            return res.status(400).send('Invalid object id')
        }
    }
})


module.exports = showRouter;