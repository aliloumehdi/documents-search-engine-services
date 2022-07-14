const imageThumbnail = require('image-thumbnail');

let fs = require('fs')
const { PDFNet } = require('@pdftron/pdfnet-node');




exports.thumbimg = (path, uuid) => {
  imageThumbnail(path)
    .then(thumbnail => {


      fs.writeFileSync("./public/tumbs/" + uuid + ".jpg", thumbnail)

    })
    .catch(err => console.error(err));
}



exports.pdfThumb = (path, uuid) => {

  // let ext = path.parse(path).ext;

  // const inputPath = path.resolve(path);
  // const outputPath = path.resolve("./public/tumbs/"+uuid+".jpg");



  const main = async () => {
    const doc = await PDFNet.PDFDoc.createFromFilePath(path);
    await doc.initSecurityHandler();
    const pdfdraw = await PDFNet.PDFDraw.create(92);
    const currPage = await doc.getPage(1);
    await pdfdraw.export(currPage, "./public/tumbs/" + uuid + ".jpg", 'JPEG');
  };

  PDFNetEndpoint(main, "./public/tumbs/" + uuid + ".jpg");
}


exports.office = (path, uuid) => {

  const convertOffice = async () => {


    const doc = await PDFNet.PDFDoc.create();
    await doc.initSecurityHandler();

    
    await PDFNet.Convert.toPdf(doc,path)

    await doc.save("./public/" + uuid + ".pdf", PDFNet.SDFDoc.SaveOptions.e_linearized);

    
  };


  PDFNetEndpointGEN(convertOffice, "./public/" + uuid + ".pdf");
}


const PDFNetEndpoint = (main, pathname) => {


  PDFNet.runWithCleanup(main, "demo:a.moustahsane@veviosys.ma:7a4864330200000000e2b829f425dcc97981fefb1cbacc356689b331c5").then(() => {
    PDFNet.shutdown();
    fs.readFile(pathname, (err, data) => {
      if (err) {

      } else {
        // const ext = path.parse(pathname).ext;

      }
    });
  })
    .catch(error => {
      console.log(error);
    });
};
const PDFNetEndpointGEN = (main, pathname,uuid) => {


  PDFNet.runWithCleanup(main, "demo:a.moustahsane@veviosys.ma:7a4864330200000000e2b829f425dcc97981fefb1cbacc356689b331c5").then(() => {
    PDFNet.shutdown();
    fs.readFile(pathname, (err, data) => {
      if (err) {

      } else {
        // const ext = path.parse(pathname).ext;
        tPDF(pathname,uuid)

      }
    });
  })
    .catch(error => {
      console.log(error);
    });
};



const tPDF =  (path, uuid) => {

  // let ext = path.parse(path).ext;

  // const inputPath = path.resolve(path);
  // const outputPath = path.resolve("./public/tumbs/"+uuid+".jpg");



  const main = async () => {
    const doc = await PDFNet.PDFDoc.createFromFilePath(path);
    await doc.initSecurityHandler();
    const pdfdraw = await PDFNet.PDFDraw.create(92);
    const currPage = await doc.getPage(1);
    await pdfdraw.export(currPage, "./public/tumbs/" + uuid + ".jpg", 'JPEG');
  };
console.log(uuid);
  PDFNetEndpoint(main, "./public/tumbs/" + uuid + ".jpg");
}



