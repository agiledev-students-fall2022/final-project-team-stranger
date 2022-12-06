const chai = require("chai");
const expect = require("chai");
const app = require("../app.js");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

describe("POST request to /messages route without logging in", () => {
  it("it should respond with an HTTP 400 status code and an object in the response body", (done) => {
    chai
      .request(app)
      .post("/messages")
      .end((err, res) => {
        res.should.have.status(400); // use should to make BDD-style assertions
        res.body.should.be.a("object"); // our route sends back an object
        done(); // resolve the Promise that these tests create so mocha can move on
      });
  });
});

describe("POST request to /send-message/get route without logging in", () => {
  it("it should respond with an HTTP 400 status code and an object in the response body", (done) => {
    chai
      .request(app)
      .post("/send-message/get")
      .end((err, res) => {
        res.should.have.status(400); // use should to make BDD-style assertions
        res.body.should.be.a("object"); // our route sends back an object
        done(); // resolve the Promise that these tests create so mocha can move on
      });
  });
});
