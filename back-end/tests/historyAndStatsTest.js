const chai = require('chai');
const expect=require("chai")
const app=require("../app")
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe("POST method for /history", () => {
    it("Should respond with 400!", done => {
        chai
        .request(app)
        .post("/history")
        .end((err, res) => {
            res.should.have.status(400);

            done()
        })
    })
    it("Should respond with a json object!", done => {
        chai
        .request(app)
        .get("/history")
        .end((err, res) => {
            res.should.to.be.json;

            done()
        })
    })
    it("Should respond with an array!", done => {
        chai
        .request(app)
        .get("/history")
        .end((err, res) => {
            res.body.should.be.a('array');

            done()
        })
    })
})
describe("GET method for /stats", () => {
    it("Should respond with 200!", done => {
        chai
        .request(app)
        .get("/stats")
        .end((err, res) => {
            res.should.have.status(200);

            done()
        })
    })
    it("Should respond with a json object!", done => {
        chai
        .request(app)
        .get("/stats")
        .end((err, res) => {
            res.should.to.be.json;

            done()
        })
    })
    it("Should respond with an array!", done => {
        chai
        .request(app)
        .get("/stats")
        .end((err, res) => {
            res.body.should.be.a('array');

            done()
        })
    })
})