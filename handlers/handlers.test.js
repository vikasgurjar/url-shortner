const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const handlers = require("./handlers")
const isEmpty=require('../handlers/handlers').isEmpty

  
  describe("create short url", function() {
    const stubValue = {
        success: true,
        shortUrl: faker.random.alphaNumeric(8),
      };
    it("should return a short url", async function() {
      const stub = sinon.stub(handlers, "createAndSaveShortUrl").returns(stubValue);
      const result = await handlers.createAndSaveShortUrl(stubValue.url);
      expect(result.success).to.be.true
      expect(result).to.have.property('shortUrl');
   
    });
  });

  describe("get short url", function() {
    
    it("should return orignal url", async function() {
      const stubValue = {
        data:faker.internet.url,
        statusCode: 200
    }
      const stub = sinon.stub(handlers, "redirectToOrignal").returns(stubValue);
      const result = await handlers.redirectToOrignal(stubValue.shortUrl);
      expect(result).to.have.property('data');
   
    });

    /* it("should return status 404 when no data", async function() {
      const stubValue = {
        statusCode: 400
    }
      const stub = sinon.stub(handlers, "redirectToOrignal").returns(stubValue);
      const result = await handlers.redirectToOrignal(stubValue.shortUrl);
      expect(result.data).to.be.an('undefined');
      expect(result.statusCode).to.equal(400)
   
    }); */


  });

  describe("check if empty object", function() {
    const stubValue = {};
    it("should return a short url", async function() {
      // const stub = sinon.stub(handlers, "isEmpty").returns(stubValue);
      const result = await handlers.isEmpty(stubValue);
      expect(result).to.be.true
    });
  });