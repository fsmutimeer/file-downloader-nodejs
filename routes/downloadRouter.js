const downloadRouter = require('express').Router();
const File = require('../models/file');

downloadRouter.get('/:uuid',async (req, res)=>{

    try {
        
        const file = await File.findOne({uuid:req.params.uuid});
        if(!file)
        {
            return res.status(400).send('file not found');
        }
        const filePath = `${__dirname}/../${file.path}`;
        res.download(filePath);
    } catch (error) {
        console.error(error);
        return res.status(500).send('download could not be completed');
    }

})

module.exports = downloadRouter;