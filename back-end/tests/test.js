const chai = require('chai');
const expect=require("chai")
const app=require("/Users/youyuzhu/Desktop/agile/final-project-team-stranger/back-end/app.js")
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe("Demo test for the History", () => {
    it("Should respond with a json object!", done => {
        chai
        .request(app)
        .get("/history")
        .end((err, res) => {
            res.should.have.status(200);
            done()
        })
    })
})
