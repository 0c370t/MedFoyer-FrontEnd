import assert from 'assert';
import {describe, it} from "mocha";
import * as datetime from "../src/helpers/datetime";

describe("datetime.js", function () {
    describe("#padMinutes(minutes)", function () {
        it("should return 0n when n is less than 10", function () {
            assert.equal(datetime.padMinutes(5), "05");
            assert.equal(datetime.padMinutes(0), "00");
            assert.equal(datetime.padMinutes(9), "09");
        });
        it("should return n when n is greater than 10", function(){
            assert.equal(datetime.padMinutes(10), "10");
            assert.equal(datetime.padMinutes(59), "59");
        });
        it("should fail when given a string", function(){
            assert.equal(datetime.padMinutes(""), "Invalid");
        });
    });
    describe("#formatTime(date)", function(){
        it("should return hours:minutes am/pm", function(){
            let date = new Date("1970-01-01");
            date.setHours(8, 15);
            assert.equal(datetime.formatTime(date), "8:15 am");
            date.setHours(20, 15);
            assert.equal(datetime.formatTime(date), "8:15 pm");
        });
        it("should properly handle 12 am", function(){
            let date = new Date("1970-01-01");
            date.setHours(0,0);
            assert.equal(datetime.formatTime(date), "12:00 am");
        });
        it("should properly handle 12 pm", function() {
            let date = new Date("1970-01-01");
            date.setHours(12, 0);
            assert.equal(datetime.formatTime(date), "12:00 pm");
        });
    });
    describe ("#formatForDisplay(dateString, includeTime=false)", function(){
        it("should return Day, Month Date when given a date", function () {
            let date = new Date(2020,5,19);
            assert.equal(datetime.formatForDisplay(date), "Friday, June 19");
        });
        it("should accept a string formatted as 'YYYY-MM-DD', and return Day, Month, Date", function () {
            assert.equal(datetime.formatForDisplay("2020-06-19"), "Friday, June 19");
        });
        it("should return an empty string when given an empty or null value", function () {
            assert.equal(datetime.formatForDisplay(), "");
            assert.equal(datetime.formatForDisplay(""), "");
        });
    })
});