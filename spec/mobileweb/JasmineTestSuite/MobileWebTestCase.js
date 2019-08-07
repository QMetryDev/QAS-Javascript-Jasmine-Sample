/**
* @author: rinkesh.jain
*
*/

var protractor = require('protractor');
var locatorUtils = require('../../../base/locators');
var commonStepsModule = require('../../../base/commonsteps');
let actions = new commonStepsModule.CommonSteps();


describe("JasmineTestsuite", function() {
  protractor.browser.waitForAngularEnabled(false);
  protractor.browser.get(browser.baseUrl);
 
  it("Mobile Web Test case",async function() {
    
         await actions.get("https://www.gmail.com"); 
         await actions.clear("email.identifierid_1"); 
         await actions.sendKeys("demoqas2019@gmail.com" , "email.identifierid_1"); 
         await actions.click("div.div2111_1"); 
         await actions.verifyValue("email.identifierid_1" , "demoqas2019@gmail.com"); 
         await actions.verifyPresent("span.span1111_2"); 
         await actions.click("span.span1111_2"); 
         await actions.clear("password.qas2019_1"); 
         await actions.sendKeys("QAS@2019" , "password.qas2019_1"); 
         await actions.click("div.div111"); 
         await actions.verifyValue("password.qas2019_1" , "QAS@2019"); 
         await actions.verifyPresent("span.span1111_1_1"); 
         await actions.click("span.span1111_1_1"); 
  });
  
});
