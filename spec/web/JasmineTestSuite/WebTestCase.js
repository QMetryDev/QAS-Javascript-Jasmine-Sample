/**
* @author: ankit.detroja
*
*/

var protractor = require('protractor');
var locatorUtils = require('../../../base/locators');
var commonStepsModule = require('../../../base/commonsteps');
let actions = new commonStepsModule.CommonSteps();


describe("web", function() {
  protractor.browser.waitForAngularEnabled(false);
  protractor.browser.get(browser.baseUrl);
 
  it("web",async function() {
    
         await actions.get("https://www.gmail.com"); 
         await actions.clear("email.identifierid"); 
         await actions.sendKeys("demoqas2019@gmail.com" , "email.identifierid"); 
         await actions.click("div.div11111_1"); 
         await actions.waitForVisible("password.qas2019");
         await actions.clear("password.qas2019");
         await actions.sendKeys("QAS@2019" , "password.qas2019"); 
         await actions.verifyValue("password.qas2019" , "QAS@2019"); 
         await actions.verifyPresent("span.span1111"); 
         await actions.click("span.span1111"); 
  });
  
});
