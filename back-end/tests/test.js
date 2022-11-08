
const downsort=require("/Users/youyuzhu/Desktop/agile/final-project-team-stranger/back-end/logic/HistoryFunction.js")
const chai = require('chai');
const expect=require("chai")
const app=require("/Users/youyuzhu/Desktop/agile/final-project-team-stranger/back-end/app.js")
const chaiHttp = require('chai-http');
const should = chai.should();
const downsort=require("/Users/youyuzhu/Desktop/agile/final-project-team-stranger/back-end/logic/HistoryFunction.js")
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


describe("Downsort basic functionality", ()=>{
    it("returns an object with downsort order in given string:",()=>{
        const sample=[            
            {
                "index":2,
                "name":"bb",
                "score":50
            },
            {
                "index":1,
                "name":"cc",
                "score":100
            },
            {
                "index":3,
                "name":"aa",
                "score":200
            }
        ]
        const expected=[
            {
                "index":1,
                "name":"cc",
                "score":100
            },
            {
                "index":2,
                "name":"bb",
                "score":50
            },
            {
                "index":3,
                "name":"aa",
                "score":200
            }
        ]
        const actual=sample.sort(downsort("name"))
        ac;
    })
})