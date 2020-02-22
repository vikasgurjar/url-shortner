const express = require("express");
const router = express.Router();
require("dotenv").config();
const ShortUrls = require("../models/ShortUrls");
const createAndSaveShortUrl=require('../handlers/handlers').createAndSaveShortUrl
const isEmpty=require('../handlers/handlers').isEmpty
const redirectToOrignal=require('../handlers/handlers').redirectToOrignal
// get base URL
const baseUrl = process.env.BASE_URL;
/**
 * @route POST api/short
 * @desc Short a given URL
 * @access public
 */
router.post("/short", (req, res, next) => {
 
  let shortUrl;
  console.log(req.body );
  
  if (isEmpty(req.body)) {
    res
      .status(400)
      .json({ success: false, msg: "Data missing!", data: req.body });
  }
  // Create a shorturl object
  shortUrl = new ShortUrls({
    url: req.body.url,
  });
  createAndSaveShortUrl(shortUrl, res);
});
/**
 * @route GET api/urlID
 * @desc Redirect to actual url based on URL ID
 * @access public
 */
router.get("/:id", async(req, res, next) => {
  const urlCode = req.params.id;
  // console.log('url id', urlCode);
  const url=await redirectToOrignal(urlCode,res)
  console.log(url)
  if(url.statusCode==500)
    res.status(500).json({ success: false, msg: "Internal Server Error!" });
  else if(url.statusCode==404)
    res.status(404).json({ success: false, msg: "URL does not exist!" });
  else
    res.redirect(url.data);

});




module.exports = router