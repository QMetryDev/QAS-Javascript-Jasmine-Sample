/**
* @author: nidhi.shah
*
*/

var protractor = require('protractor');
var locatorUtils = require('../../../base/locators');
var commonStepsModule = require('../../../base/commonsteps');
let actions = new commonStepsModule.CommonSteps();


describe("web", function () {
  protractor.browser.waitForAngularEnabled(false);
  protractor.browser.get(browser.baseUrl);

  it("VerifyCreditedAmount", async function () {

    await actions.get("https://qas.qmetry.com/bank");
    await actions.clear("text.txtusername");
    await actions.sendKeys("Bob", "text.txtusername");
    await actions.clear("password.txtpassword");
    await actions.sendKeys("Bob", "password.txtpassword");
    await actions.click("button.btnlogin");
    await actions.waitForVisible("button.button");
    await actions.verifyPresent("button.button");
    await actions.clear("number.enteramountforcredit");
    await actions.sendKeys("1000", "number.enteramountforcredit");
    await actions.click("button.button11");
    await actions.verifyPresent("div.div");
    await actions.click("button.button");
    await actions.verifyPresent("button.btnlogin");
  });

});
