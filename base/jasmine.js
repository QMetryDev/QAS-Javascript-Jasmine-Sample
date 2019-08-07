"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class Listener {
    jasmineStarted(suiteInfo) {
        // console.log('jasmine started');
    }
    suiteStarted(result) {
        // console.log('suite start');
    }
    specStarted(result) {
        // console.log('spec start');
    }
    specDone(result) {
        // console.log('spec done');
    }
    suiteDone(result) {
        // console.log('suite done');
    }
}
exports.Listener = Listener;
