const imageThumbnail = require('image-thumbnail');
let fs = require('fs')





exports.thumbimg = (path,uuid) => {imageThumbnail(path)
    .then(thumbnail => { 
        
        
        fs.writeFileSync("./public/tumbs/"+uuid+".jpg", thumbnail)
        
       })
    .catch(err => console.error(err));}