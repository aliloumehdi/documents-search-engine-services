
const textPDFextract = require('pdf-parse');
const tesseract = require("node-tesseract-ocr");
var pdf2img = require('pdf-img-convert');
var fs = require('fs');
const officeParser = require('officeparser');

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
}


exports.pdfextractor = (doc, path) => {


  return new Promise((resolve, reject) => {

    textPDFextract(doc).then(res => {
      const resData = res.text
      console.log(resData.replace('\n', '').trim())

      if (resData.replace('\n', '').trim().length > 1) {
        console.log(res);
        resolve(res.text)
      }
      else {
        console.log("ocr");
        splitAndDoOcr(path).then(rr => {


          console.log(doc);
          resolve(rr)
        })
      }
    }, err => {
      console.log(err);
    })



  });



}
exports.imageExtractor = (doc, path) => {
  return new Promise((resolve, reject) => {


    imgToText(doc).then((text) => {
      resolve(text);
    })
      .catch((error) => {

        reject(error)

      })


  });

}

exports.imageExtractor = (doc, path) => {
  return new Promise((resolve, reject) => {


    imgToText(path).then((text) => {
      resolve(text);
    })
      .catch((error) => {

        reject(error)

      })


  });

}



const officeExtrctor = async (doc) => {

  return new Promise((resolve, reject) => {

    officeParser.parseOfficeAsync(doc).then((data) => {
      resolve(data)
    }).catch((err) => {
      reject(err)
    });

  });
}
exports.officeExtrctor = officeExtrctor

const imgToText = (img) => {

  return tesseract.recognize(img, config)

}




const splitAndDoOcr = async (doc) => {

  return new Promise((resolve, reject) => {


    var output = pdf2img.convert(doc);

    // Acting on this promise when it's fulfilled:
    output.then(function (pdfArray) {

      let text = "";

      // Loop through each page, saving the images
      for (i = 0; i < pdfArray.length; i++) {


        imgToText(pdfArray[i]).then(res => {



          text += res + " "
          if (i == (pdfArray.length)) {
            console.log(text);
            resolve(text);

          }

        })

      }
    });
  });
}



