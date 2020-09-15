"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const locators_1 = require("./locators");
let locatorUtil = new locators_1.LocatorUtils();
exports.Validator = function () {
    this.verifyText = function (locator, expectedText) {
        expect(protractor_1.element(locatorUtil.getLocator(locator)).getText()).toBe(expectedText);
    };
    this.verifyPartialText = function (locator, expectedText) {
        expect(protractor_1.element(locatorUtil.getLocator(locator)).getText()).toContain(expectedText);
    };
    this.verifyPresent = function (locator) {
        expect(protractor_1.element(locatorUtil.getLocator(locator)).isPresent()).toBeTruthy();
    };
    this.verifyNotPresent = function (locator) {
        expect(protractor_1.element(locatorUtil.getLocator(locator)).isPresent()).toBeFalsy();
    };
    this.verifyVisible = function (locator) {
        expect(protractor_1.element(locatorUtil.getLocator(locator)).isDisplayed()).toBeTruthy();
    };
    this.verifyNotVisible = function (locator) {
        if (protractor_1.element(locatorUtil.getLocator(locator)).isPresent()) {
            expect(protractor_1.element(locatorUtil.getLocator(locator)).isDisplayed()).toBeFalsy();
        }
    };
    this.verifyAttribute = function (locator, attribute, expectedValue) {
        expect(protractor_1.element(locatorUtil.getLocator(locator)).getAttribute(attribute)).toBe(expectedValue);
    };
};
