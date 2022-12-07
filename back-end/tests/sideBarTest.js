const chai = require("chai");
const expect = require("chai");
const app = require("../app.js");
const chaiHttp = require("chai-http");
const { default: mongoose } = require("mongoose");
const should = chai.should();
chai.use(chaiHttp);

describe("POST request to /sidebar route without auth", () => {
  it("it should respond with an HTTP 400 status code and an object in the response body", (done) => {
    chai
      .request(app)
      .post("/sidebar")
      .end((err, res) => {
        res.should.have.status(400); // use should to make BDD-style assertions
        res.body.should.be.a("object"); // our route sends back an object
        done(); // resolve the Promise that these tests create so mocha can move on
      });
  });
});

describe("POST request to /sidebar route", () => {
  it("it should respond with an HTTP 200 status code and an object in the response body", (done) => {
    chai
      .request(app)
      .post("/login")
      // send user login details, using admin account as sample
      .send({
        email: "stranger@nyu.edu",
        password: "admin",
      })
      .end((err, res) => {
        console.log("this runs the login part");
        res.body.should.have.property("token");
        let token = res.body.token;
        chai
          .request(app)
          .post("/sidebar")
          .set("Authorization", "JWT " + token)
          .end((err, res) => {
            res.should.have.status(200); // use should to make BDD-style assertions
            res.body.should.be.a("object"); // our route sends back an object
            res.body.should.have.property("username").and.to.be.a("string");
            res.body.should.have.property("joinTime").and.to.be.a("number");
            done(); // resolve the Promise that these tests create so mocha can move on
            mongoose.connection.close(function () {
              console.log('Mongoose disconnected on app termination');
            })
          });
      });
  });
});
