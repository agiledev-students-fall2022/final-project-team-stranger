const chai = require('chai');
const expect=require("chai")
const app=require("../app")
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe("POST method for /history when not logged in", () => {
    it("Should respond with 400 when not logged in!", done => {
        chai
        .request(app)
        .post("/history")
        .end((err, res) => {
            res.should.have.status(400);
            done();
        })
    })
})
describe("POST request to /history route when logged in", () => {
    it("it should respond with an HTTP 200 status code and an json array in the response body", (done) => {
      chai
        .request(app)
        .post("/login")
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
            .post("/history")
            .set("Authorization", "JWT " + token)
            .end((err, res) => {
              res.should.have.status(200); // use should to make BDD-style assertions
            //   res.body.should.be.a('array');
              res.body[0].should.have.property("content");
              done(); // resolve the Promise that these tests create so mocha can move on
            });
        });
    });
  });
describe("POST method for /stats when not logged in", () => {
    it("Should respond with 400 when not logged in!", done => {
        chai
        .request(app)
        .post("/stats")
        .end((err, res) => {
            res.should.have.status(400);
            done();
        })
    })
})
describe("POST request to /stats route when logged in", () => {
    it("it should respond with an HTTP 200 status code and an json array in the response body", (done) => {
      chai
        .request(app)
        .post("/login")
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
            .post("/history")
            .set("Authorization", "JWT " + token)
            .end((err, res) => {
              res.should.have.status(200); // use should to make BDD-style assertions
              res.body.should.be.a('array');
              res.body[0].should.have.property("created_by");
              res.body[0].should.have.property("frequency");
              res.body[0].should.have.property("createdAt");
              done(); // resolve the Promise that these tests create so mocha can move on
            });
        });
    });
  });