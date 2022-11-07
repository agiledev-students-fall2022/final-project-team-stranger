import chai, { expect } from 'chai';
import {downsort} from "../app.js"; 
import assert from "assert"; 


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
        const actual=downsort(sample,"name");
        expect(actual).to.deep.equal(expected);
    })
})