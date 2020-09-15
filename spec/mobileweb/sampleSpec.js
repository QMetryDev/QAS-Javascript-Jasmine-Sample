/**
* @author:
*
*/

var protractor = require('protractor');
var locatorUtils = require('../../base/locators');
var commonStepsModule = require('../../base/commonsteps');
let actions = new commonStepsModule.CommonSteps();


describe("Sample TestSuite", function () {
	protractor.browser.waitForAngularEnabled(false);
	protractor.browser.get(browser.baseUrl);
	it("Sampel TestCase", async function () {
	});
});
