const shortid = require('shortid');
const ShortUrls = require("../models/ShortUrls");
const createAndSaveShortUrl= (shortUrlObj, res)=> {
    let randomStr = shortid.generate(); // Generate a random string to replace the url
  
    // Check if the random string already exist in DB
    ShortUrls.findOne({ $or:[{urlCode: randomStr},{url:shortUrlObj.url}] }, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err)
      } else if (result == null || isEmpty(result)) {
        shortUrlObj.urlCode = randomStr;
        shortUrlObj.save(err => {
          if (err) {
            res.status(400).json({ success: true, msg: err });
          }
          res.status(200).json({ success: true, shortUrl: randomStr });
        });
      } else if(shortUrlObj.url==result.url){
        res.status(200).json({ success: true, shortUrl: result.urlCode })
      }else{
         createAndSaveShortUrl(shortUrlObj,res);
      }
    });
}

const  isEmpty=(obj)=> {
    if (obj == null) return true;
    return Object.entries(obj).length === 0 && obj.constructor === Object;
}

const redirectToOrignal=(urlCode,res)=>{
 return ShortUrls.findOne({ urlCode: urlCode })
    .then(urlObj=>{
      if (isEmpty(urlObj)) {
        return {statusCode:404}
      } 
      return {statusCode:200, data: urlObj.url};

    }).catch(err=>{
      return {statusCode:500}
    })   
}

module.exports={isEmpty,createAndSaveShortUrl,redirectToOrignal}