const chai = require("chai");
const expect = require("chai");
const app = require("../app.js");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

describe("GET request to /messages route", () => {
  it("it should respond with an HTTP 400 or 304 status code and an object in the response body", (done) => {
    chai
      .request(app)
      .post("/messages")
      .end((err, res) => {
        res.should.have.status(400); // use should to make BDD-style assertions
        // res.body.should.be.a("object"); // our route sends back an object
        // res.body.should.have.property("messages").and.to.be.a("array");
        // res.body.should.have.property("status", "all good");
        done(); // resolve the Promise that these tests create so mocha can move on
      });
  });
});

describe("GET request to /summary route", () => {
  it("it should respond with an HTTP 400 or 304 status code and an object in the response body", (done) => {
    chai
      .request(app)
      .post("/summary")
      .end((err, res) => {
        res.should.have.status(400); // use should to make BDD-style assertions
        // res.body.should.be.a("object"); // our route sends back an object
        // res.body.should.have.property("view").and.to.be.a("Number");
        // res.body.should.have.property("lastMessage").and.to.be.a("String");
        // res.body.should.have.property("status", "all good");
        done(); // resolve the Promise that these tests create so mocha can move on
      });
  });
});

describe("POST request to /send-message route", () => {
  it("it should respond with an HTTP 400 status code and an object in the response body", (done) => {
    chai
      .request(app)
      .post("/send-message")
      .send({
        message: "test message", // return the message we just saved
        status: "all good",
      })
      .end((err, res) => {
        res.should.have.status(400); // use should to make BDD-style assertions
        // res.body.should.be.a("object"); // our route sends back an object
        // res.body.should.have.property("message").and.to.be.a("String");
        // res.body.should.have.property("status", "all good");
        done(); // resolve the Promise that these tests create so mocha can move on
      });
  });
});
