const chai = require('chai');
const expect=require("chai")
const app=require("/Users/youyuzhu/Desktop/agile/final-project-team-stranger/back-end/app.js")
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe("Demo test for the History", () => {
    it("Should respond with 200!", done => {
        chai
        .request(app)
        .get("/history")
        .end((err, res) => {
            res.should.have.status(200);

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
describe("Demo test for the Stats", () => {
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