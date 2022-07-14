
var extractors = require('../services/extractor');
var elstic = require('../eslaticnode/server');
var thumb = require('../thumbnail/generator');
var toPdf = require("office-to-pdf")
var fs = require('fs')
var {fromPath } = require('pdf2pic')
const { v4: uuidv4 } = require('uuid');
exports.index = function (req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.upload = async (req, res) => {

    try {


        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {

            let uuid = uuidv4();
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let rawdoc = req.files.rawdoc;

            let metadata = req.body.metadata
           

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            const tempPath = './public/files/' + uuid+"_"+rawdoc.name
            await rawdoc.mv(tempPath);



            
            // var wordBuffer = fs.readFileSync(tempPath)

            // toPdf(wordBuffer).then(
            //   (pdfBuffer) => {
            //     console.log("pdfBuffer");
            //     fs.writeFileSync("test.pdf", pdfBuffer)
            //   }, (err) => {
            //     console.log(err)
            //   }
            // )






            const text = await extractTexte(rawdoc, tempPath,uuid);


            elstic.post({ upload_date : new Date(), fileName : rawdoc.name ,mimetype: rawdoc.mimetype, content :  text , fileUrl : "http://localhost:3000/"+ tempPath.replace('./public/',''), metadata : metadata , uuid : uuid })
            
            
            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: rawdoc.name,
                    mimetype: rawdoc.mimetype,
                    size: rawdoc.size,
                    text : text
                }
            });

            

            
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

const extractTexte = async (doc, tempPath,uuid) => {


    return new Promise((resolve, reject) => {

        if (doc.mimetype == "application/pdf") {

            extractors.pdfextractor(doc, tempPath,uuid).then(res => {

                resolve(res)
                thumb.pdfThumb(tempPath,uuid)


            })

        } else if (doc.mimetype.split('/')[0] == "image") {
            extractors.imageExtractor(doc, tempPath,uuid).then(res => {
                console.log("IMG")

                resolve(res)
                console.log("IMG ----------")
                
            })
        } else {
            extractors.officeExtrctor(tempPath, tempPath,uuid).then(res => {
                console.log("OFFICE")
                thumb.office(tempPath,uuid)
                resolve(res)
            })
        }

    });
}