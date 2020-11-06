// Object.defineProperty(exports, "__esModule", { value: true });

var commonStepsModule = require('../../base/commonsteps');
let actions = new commonStepsModule.CommonSteps();
async function customStepMobileLibrary(){
        await actions.get("https://www.flipkart.com/"); 
    }
exports.customStepMobileLibrary = customStepMobileLibrary;
