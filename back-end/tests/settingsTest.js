const chai = require("chai");
const expect = require("chai");
const app = require("../app.js");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

const mongoose = require("mongoose");
const db = require("../models/db.js");
const Message = mongoose.model("Message");
const User = mongoose.model("User");
//tests below

describe("POST request to /settings/update route without auth", () => {
  it("it should respond with an HTTP 400 status code and an object in the response body", (done) => {
    chai
      .request(app)
      .post("/settings/update")
      .end((err, res) => {
        res.should.have.status(400); // use should to make BDD-style assertions
        res.body.should.be.a("object"); // our route sends back an object
        done(); // resolve the Promise that these tests create so mocha can move on
      });
  });
});

describe("POST request to /settings/update route", () => {
  it("it should respond with an HTTP 200 an object in the response body", (done) => {
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
          .post("/settings/update")
          .send({
            username: "admin2",
            email: "stranger@nyu.edu",
            password: "admin",
          })
          .set("Authorization", "JWT " + token)
          .end((err, res) => {
            res.should.have.status(200); // use should to make BDD-style assertions
            res.body.should.be.a("object"); // our route sends back an object
            done(); // resolve the Promise that these tests create so mocha can move on
          });
      });
  });
});

describe("POST request to /status/get route without auth", () => {
  it("it should respond with an HTTP 400 status code and an object in the response body", (done) => {
    chai
      .request(app)
      .post("/settings/get")
      .end((err, res) => {
        res.should.have.status(400); // use should to make BDD-style assertions
        res.body.should.be.a("object"); // our route sends back an object
        done(); // resolve the Promise that these tests create so mocha can move on
      });
  });
});

describe("POST request to /status/get route", () => {
  it("it should respond with an HTTP 200 an object in the response body", (done) => {
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
          .post("/settings/get")
          .set("Authorization", "JWT " + token)
          .end((err, res) => {
            res.should.have.status(200); // use should to make BDD-style assertions
            res.body.should.be.a("object"); // our route sends back an object
            res.body.should.have.property("username", "admin2");
            User.findOneAndUpdate(
              { email: "stranger@nyu.edu" },
              { username: "admin" }
            ).exec((err, data) => {
              if (err) {
                console.log(err);
              }
            });
            done(); // resolve the Promise that these tests create so mocha can move on
          });
      });
  });
});
