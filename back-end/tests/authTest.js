const chai = require("chai");
const expect = require("chai");
const app = require("../app.js");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

const mongoose = require("mongoose");
const db = require("../models/db.js");
const User = mongoose.model("User");

//login cases
describe("POST request to /login leading to authFail: no password", () => {
  it("it should respond with an HTTP 401 status code and an object in the response body", (done) => {
    chai
      .request(app)
      .post("/login")
      // send user login details, using admin account as sample
      .send({
        email: "strange@nyu.edu",
        password: "", //no password provided
      })
      .end((err, res) => {
        res.should.have.status(401); // use should to make BDD-style assertions
        res.body.should.be.a("object"); // our route sends back an object
        res.body.should.have.property("success", false);
        res.body.should.have.property(
          "message",
          "no username or password supplied."
        );
        done(); // resolve the Promise that these tests create so mocha can move on
      });
  });
});

describe("POST request to /login leading to authFail: incorrect email", () => {
  it("it should respond with an HTTP 401 status code and an object in the response body", (done) => {
    chai
      .request(app)
      .post("/login")
      // send user login details, using admin account as sample
      .send({
        email: "strange@nyu.edu", //incorrect email
        password: "admin",
      })
      .end((err, res) => {
        res.should.have.status(401); // use should to make BDD-style assertions
        res.body.should.be.a("object"); // our route sends back an object
        res.body.should.have.property("success", false);
        res.body.should.have.property("message", "User not found.");
        done(); // resolve the Promise that these tests create so mocha can move on
      });
  });
});

describe("POST request to /login leading to authFail: incorrect password", () => {
  it("it should respond with an HTTP 401 status code and an object in the response body", (done) => {
    chai
      .request(app)
      .post("/login")
      // send user login details, using admin account as sample
      .send({
        email: "stranger@nyu.edu",
        password: "admin1", //incorrect password
      })
      .end((err, res) => {
        res.should.have.status(401); // use should to make BDD-style assertions
        res.body.should.be.a("object"); // our route sends back an object
        res.body.should.have.property("success", false);
        res.body.should.have.property("message", "Incorrect Credentials.");
        done(); // resolve the Promise that these tests create so mocha can move on
      });
  });
});

describe("POST request to /login with correct credentials", () => {
  it("it should respond with an object in the response body with the signed user token", (done) => {
    chai
      .request(app)
      .post("/login")
      // send user login details, using admin account as sample
      .send({
        email: "stranger@nyu.edu",
        password: "admin", //incorrect password
      })
      .end((err, res) => {
        res.body.should.be.a("object"); // our route sends back an object
        res.body.should.have.property("success", true);
        res.body.should.have.property("token");
        done(); // resolve the Promise that these tests create so mocha can move on
      });
  });
});

describe("POST request to /signup", () => {
  it("it should respond with an object in the response body with the signed user token", (done) => {
    chai
      .request(app)
      .post("/signup")
      // send user login details, using admin account as sample
      .send({
        username: "unit test user",
        password: "unittest",
        email: "test@test.io",
      })
      .end((err, res) => {
        res.body.should.be.a("object"); // our route sends back an object
        res.body.should.have.property("success", true);
        res.body.should.have.property("token");
        User.deleteOne({ username: "unit test user" }).exec((err, data) => {
          if (err) {
            console.log(err);
          }
        });
        done(); // resolve the Promise that these tests create so mocha can move on
      });
  });
});
