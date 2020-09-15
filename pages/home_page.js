"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const locators_1 = require("../base/locators");
const commonsteps_1 = require("../base/commonsteps");
let locators = new locators_1.LocatorUtils();
let actions = new commonsteps_1.CommonSteps();
class HomePage {
    constructor() {
        this.acceptTerms = function () {
            protractor_1.element(locators.getLocator('home.accept.terms.checkbox.loc'))
                .isDisplayed()
                .then(isDisplayed => {
                if (isDisplayed) {
                    actions.click('home.accept.terms.checkbox.loc');
                    actions.click('home.accept.terms.btn.loc');
                }
            });
            protractor_1.element(locators.getLocator('home.popup.close.loc'))
                .isDisplayed()
                .then(isDisplayed => {
                if (isDisplayed) {
                    actions.click('home.popup.close.loc');
                    protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.invisibilityOf(protractor_1.element(locators.getLocator('home.popup.close.loc'))), 10000);
                }
            });
        };
        this.selectLink = function (link) {
            this.acceptTerms();
            if (link == 'REPAIR') {
                actions.click('home.repair.icon.loc');
            }
            else if (link == 'COMMUNITY') {
                actions.click('home.community.icon.loc');
            }
            else if (link == 'QUOTE') {
                actions.click('home.quote.icon.loc');
            }
        };
        this.logout = function () {
            actions.click('home.user.account.loc');
            actions.click('home.logout.loc');
            protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.invisibilityOf(protractor_1.element(locators.getLocator('home.logout.loc'))), 10000);
        };
    }
}
exports.HomePage = HomePage;
