const chai = require("chai");
const expect = require("chai");
const app = require("../app.js");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

const mongoose = require("mongoose");
const db = require("../models/db.js");
const Message = mongoose.model("Message");

describe("POST request to /send-message/get route with authorization", () => {
  it("should login and confirm login status for send-message page", (done) => {
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

        // follow up with requesting user protected page
        chai
          .request(app)
          .post("/send-message/get")
          .set("Authorization", "JWT " + token)
          .end((err, res) => {
            res.should.have.status(200); // use should to make BDD-style assertions
            res.body.should.be.a("object"); // our route sends back an object
            res.body.should.have.property("status", "authenticated user"); //confirm user is authorized

            done(); // resolve the Promise that these tests create so mocha can move on
          });
      });
  });
});

describe("POST request to /send-message/send route with authorization", () => {
  it("should login and confirm login status and POST new message, respond with an HTTP 200 status code in the response body", (done) => {
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

        // follow up with requesting user protected page
        chai
          .request(app)
          .post("/send-message/send")
          .send({
            message: "unit test message",
          })
          .set("Authorization", "JWT " + token)
          .end((err, res) => {
            res.should.have.status(200); // use should to make BDD-style assertions
            res.body.should.be.a("object"); // our route sends back an object
            res.body.should.have.property("message").and.to.be.a("String");
            res.body.should.have.property(
              "status",
              "New message saved to the database successfully"
            ); //confirm new message is saved to db
            //delete the test message just sent to the db
            Message.deleteOne({ content: "unit test message" }).exec(
              (err, data) => {
                if (err) {
                  console.log(err);
                }
              }
            );
            done(); // resolve the Promise that these tests create so mocha can move on
          });
      });
  });
});

describe("POST request to /messages route with authorization", () => {
  it("should login and fetch user messages from the database", (done) => {
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

        // follow up with requesting user protected page
        chai
          .request(app)
          .post("/messages")
          .set("Authorization", "JWT " + token)
          .end((err, res) => {
            res.should.have.status(200); // use should to make BDD-style assertions
            res.body.should.be.a("object"); // our route sends back an object
            res.body.should.have.property("messages").and.to.be.a("array");
            res.body.should.have.property("view").and.to.be.a("number");
            res.body.should.have.property("lastMessage").and.to.be.a("String");
            res.body.should.have.property("status", "all good");
            done(); // resolve the Promise that these tests create so mocha can move on
          });
      });
  });
});
