const should = require('should');
const path = require("path");
const fs = require('fs');
const server = require("./server");
import Http from "../src/main";

describe('ReactHttpTesting', () => {
  // Start server before testing
  const apiURI = "http://localhost:" + server.port;
  before(() => {
    console.log("Run server ...", apiURI);
    server.app.listen(server.port);
  });

  describe('get()', () => {
    it('should contains foo and bar in response', (done) => {
      Http.get(apiURI + "/secured/ping")
        .then(resp => {
          resp.should.containEql({foo: "bar"});
          done();
        });
    });
  });

  describe('post()', () => {
    it('should contains foo and bar in response', (done) => {
      const data = {foo: "bar"};
      Http.post(apiURI + "/secured/ping", data)
        .then(resp => {
          resp.should.containEql(data);
          done();
        });
    });
  });

  describe('put()', () => {
    it('should contains foo and bar in response', (done) => {
      const data = {foo: "bar"};
      Http.put(apiURI + "/secured/ping", data)
        .then(resp => {
          resp.should.containEql(data);
          done();
        });
    });
  });

  describe('patch()', () => {
    it('should contains foo and bar in response', (done) => {
      const data = {foo: "bar"};
      Http.patch(apiURI + "/secured/ping", data)
        .then(resp => {
          resp.should.containEql(data);
          done();
        });
    });
  });

  describe('delete()', () => {
    it('should empty respose', (done) => {
      Http.delete(apiURI + "/secured/ping")
        .then(resp => {
          resp.should.be.empty()
          done();
        });
    });
  });

  describe("Uploadfile()", () => {
    it("Should resposne filename", done => {
      var fileForm = {file: fs.createReadStream(path.resolve("test/data/test.png"))};
      Http.sendFiles(apiURI + "/secured/files", fileForm)
        .then(resp => {
          resp.should.containEql({filename: "test.png"});
          done();
        })
    });
  })
});
