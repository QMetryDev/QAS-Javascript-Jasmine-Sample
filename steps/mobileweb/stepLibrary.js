// Object.defineProperty(exports, "__esModule", { value: true });

var commonStepsModule = require('../../base/commonsteps');
let actions = new commonStepsModule.CommonSteps();
async function customStepWebLibrary(){
        await actions.get("https://www.flipkart.com/"); 
    }
exports.customStepWebLibrary = customStepWebLibrary;
