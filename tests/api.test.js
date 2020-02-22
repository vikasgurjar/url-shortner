let mongoose = require("mongoose");
let ShortUrls = require('../models/ShortUrls');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let faker = require("faker");
let demoShortUrl=''
chai.use(chaiHttp);

describe('ShortURL', () => {
   /*
  * Test the /POST route
  */
    it('it should save to DB', (done) => {
        
        chai.request(server)
        .post('/short')
        .send({url: "http://www.google.com"})
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('shortUrl');
            demoShortUrl=res.body.shortUrl
            done();
        });
    
    });
  
/*
  * Test the /GET route
  */
    it('it should Fetch the Orignal URL and redirect', (done) => {
    chai.request(server)
        .get('/'+demoShortUrl)
        .end((err, res) => {
                res.should.have.status(200);
            done();
        });
    });

});