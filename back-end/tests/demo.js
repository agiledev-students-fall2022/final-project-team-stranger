import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "../app.js"; 
import assert from "assert"; 
chai.use(chaiHttp);

describe("Demo test for the home route", () => {
    it("Should respond with a string containing hello world!", done => {
        chai
        .request(app)
        .get("/")
        .end((err, res) => {
            assert.match(res.text, /Hello world!/)
            done()
        })
    })
})