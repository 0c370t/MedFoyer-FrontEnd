import assert from 'assert';
import {describe, it} from "mocha";
import * as phone_numbers from "../src/helpers/phone_numbers";

describe("phone_numbers.js", function(){
    describe("#phoneClean(value)", function(){
        it("should clean *''a554-846sa;dlkjlasj3214 into (554)-846-3214", function(){
            assert.equal(phone_numbers.phoneClean("*''a554-846sa;dlkjlasj3214"), "(554)-846-3214");
        });
    });
});