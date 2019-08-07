"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const locators_1 = require("./locators");
const ConfigurationManager_1 = require("./ConfigurationManager");
let properties = ConfigurationManager_1.ConfigurationManager.getBundle();
var EC = protractor_1.protractor.ExpectedConditions;
let locatorUtil = new locators_1.LocatorUtils();
class CommonSteps {
    addLocator(locatorName, functionOrScript) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.by.addLocator(locatorName, functionOrScript);
        });
    }
    bindElement(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield protractor_1.element(protractor_1.by.binding(name));
        });
    }
    expectBinding(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield protractor_1.by.exactBinding(name);
        });
    }
    waitForPresence(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            var until = protractor_1.protractor.ExpectedConditions;
            yield protractor_1.browser.wait(until.presenceOf(protractor_1.element(locatorUtil.getLocator(locator).locator)), 5000, "Element (" +
                locatorUtil.getLocator(locator).description +
                ") taking too long to appear in the DOM");
        });
    }
    get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.get(url);
        });
    }
    sendKeys(val, locator) {
        return __awaiter(this, void 0, void 0, function* () {
            this.waitForPresence(locator);
            if (val.startsWith("${")) {
                val = properties.get(val.substring(2, val.length - 1));
            }
            yield protractor_1.element(locatorUtil.getLocator(locator).locator)
                .sendKeys(val)
                .then(() => { })
                .catch(err => {
                throw err;
            });
        });
    }
    comment(value) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.processValue(value));
        });
    }
    changeLocale(locale) {
        return __awaiter(this, void 0, void 0, function* () {
            ConfigurationManager_1.ConfigurationManager.defaultLocale = locale;
            ConfigurationManager_1.ConfigurationManager.setup();
        });
    }
    processValue(value) {
        if (value.startsWith("${")) {
            value = properties.get(value.substring(2, value.length - 1));
        }
        return value;
    }
    click(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForPresence(locator);
            yield protractor_1.element(locatorUtil.getLocator(locator).locator)
                .click()
                .then(() => { })
                .catch(err => {
                throw err;
            });
        });
    }
    submit(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForPresence(locator);
            yield protractor_1.element(locatorUtil.getLocator(locator).locator)
                .submit()
                .then(() => { })
                .catch(err => {
                throw err;
            });
        });
    }
    clear(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForPresence(locator);
            yield protractor_1.element(locatorUtil.getLocator(locator).locator)
                .clear()
                .then(() => { })
                .catch(err => {
                throw err;
            });
        });
    }
    mouseOver(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForPresence(locator);
            yield protractor_1.browser
                .actions()
                .mouseMove(protractor_1.element(locatorUtil.getLocator(locator).locator))
                .perform();
        });
    }
    verifyTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            protractor_1.browser.getTitle().then(pageTitle => {
                expect(title).toEqual(pageTitle, "Page Title should be " + title + ", actual is " + pageTitle);
            });
        });
    }
    verifyPresent(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            expect(yield protractor_1.element(locatorUtil.getLocator(locator).locator).isPresent()).toBe(true, "Element (" +
                locatorUtil.getLocator(locator).description +
                ") should be present");
        });
    }
    verifyLinkPresent(link) {
        return __awaiter(this, void 0, void 0, function* () {
            expect(yield protractor_1.element(protractor_1.by.linkText(link)).isPresent()).toBe(true, "Element (" + protractor_1.by.linkText(link) + ") should be present");
        });
    }
    verifyPartiallyLinkPresent(link) {
        return __awaiter(this, void 0, void 0, function* () {
            expect(yield protractor_1.element(protractor_1.by.partialLinkText(link)).isPresent()).toBe(true, "Element (" + protractor_1.by.partialLinkText(link) + ") should be present");
        });
    }
    verifyNotPresent(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            expect(yield protractor_1.element(locatorUtil.getLocator(locator).locator).isPresent()).toBe(false, "Element (" +
                locatorUtil.getLocator(locator).description +
                ") should not be present");
        });
    }
    verifyText(locator, text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.element(locatorUtil.getLocator(locator).locator)
                .getText()
                .then(textOfElement => {
                expect(textOfElement).toEqual(text, "Text of (" +
                    locatorUtil.getLocator(locator).description +
                    ") should be " +
                    text +
                    ", actual is " +
                    textOfElement);
            });
        });
    }
    verifyNotText(locator, text) {
        return __awaiter(this, void 0, void 0, function* () {
            if (text.startsWith("${")) {
                text = properties.get(text.substring(2, text.length - 1));
            }
            yield protractor_1.element(locatorUtil.getLocator(locator).locator)
                .getText()
                .then(textOfElement => {
                expect(textOfElement).not.toEqual(text, "Text of (" +
                    locatorUtil.getLocator(locator).description +
                    ") should not be " +
                    text +
                    ", actual is " +
                    textOfElement);
            });
        });
    }
    verifyValue(locator, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (value.startsWith("${")) {
                value = properties.get(value.substring(2, value.length - 1));
            }
            yield protractor_1.element(locatorUtil.getLocator(locator).locator)
                .getAttribute("value")
                .then(valueOfElement => {
                expect(valueOfElement).toEqual(value, "Value of (" +
                    locatorUtil.getLocator(locator).description +
                    ") should be " +
                    value +
                    ", actual is " +
                    valueOfElement);
            });
        });
    }
    verifyNotValue(locator, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (value.startsWith("${")) {
                value = properties.get(value.substring(2, value.length - 1));
            }
            yield protractor_1.element(locatorUtil.getLocator(locator).locator)
                .getAttribute("value")
                .then(valueOfElement => {
                expect(valueOfElement).not.toEqual(value, "Value of (" +
                    locatorUtil.getLocator(locator).description +
                    ") should not be " +
                    value +
                    ", actual is " +
                    valueOfElement);
            });
        });
    }
    verifyVisible(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            let condition = EC.presenceOf(protractor_1.element(locatorUtil.getLocator(locator).locator));
            yield protractor_1.browser.wait(condition, 5000).catch(reason => {
                expect(reason).toBeUndefined("Element (" +
                    locatorUtil.getLocator(locator).description +
                    ") was not present");
            });
            expect(yield protractor_1.element(locatorUtil.getLocator(locator).locator).isDisplayed()).toBe(true, "Element " +
                locatorUtil.getLocator(locator).description +
                " should be visible");
        });
    }
    verifyNotVisible(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            let condition = EC.presenceOf(protractor_1.element(locatorUtil.getLocator(locator).locator));
            yield protractor_1.browser.wait(condition, 5000).catch(reason => {
                expect(reason).toBeUndefined("Element (" +
                    locatorUtil.getLocator(locator).description +
                    ") was not present");
            });
            expect(yield protractor_1.element(locatorUtil.getLocator(locator).locator).isDisplayed()).toBe(false, "Element " +
                locatorUtil.getLocator(locator).description +
                " should not be visible");
        });
    }
    assertTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            protractor_1.browser.getTitle().then(pageTitle => {
                expect(title).toEqual(pageTitle, "Page Title should be " + title + ", actual is " + pageTitle);
            });
        });
    }
    assertPresent(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            expect(yield protractor_1.element(locatorUtil.getLocator(locator).locator).isPresent()).toBe(true, "Element (" +
                locatorUtil.getLocator(locator).description +
                ") should be present");
        });
    }
    assertLinkPresent(link) {
        return __awaiter(this, void 0, void 0, function* () {
            expect(yield protractor_1.element(protractor_1.by.linkText(link)).isPresent()).toBe(true, "Element (" + protractor_1.by.linkText(link) + ") should be present");
        });
    }
    assertPartiallyLinkPresent(link) {
        return __awaiter(this, void 0, void 0, function* () {
            expect(yield protractor_1.element(protractor_1.by.partialLinkText(link)).isPresent()).toBe(true, "Element (" + protractor_1.by.partialLinkText(link) + ") should be present");
        });
    }
    assertNotPresent(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            expect(yield protractor_1.element(locatorUtil.getLocator(locator).locator).isPresent()).toBe(false, "Element (" +
                locatorUtil.getLocator(locator).description +
                ") should not be present");
        });
    }
    assertText(locator, text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.element(locatorUtil.getLocator(locator).locator)
                .getText()
                .then(textOfElement => {
                expect(textOfElement).toEqual(text, "Text of (" +
                    locatorUtil.getLocator(locator).description +
                    ") should be " +
                    text +
                    ", actual is " +
                    textOfElement);
            });
        });
    }
    assertNotText(locator, text) {
        return __awaiter(this, void 0, void 0, function* () {
            if (text.startsWith("${")) {
                text = properties.get(text.substring(2, text.length - 1));
            }
            yield protractor_1.element(locatorUtil.getLocator(locator).locator)
                .getText()
                .then(textOfElement => {
                expect(textOfElement).not.toEqual(text, "Text of (" +
                    locatorUtil.getLocator(locator).description +
                    ") should not be " +
                    text +
                    ", actual is " +
                    textOfElement);
            });
        });
    }
    assertValue(locator, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (value.startsWith("${")) {
                value = properties.get(value.substring(2, value.length - 1));
            }
            yield protractor_1.element(locatorUtil.getLocator(locator).locator)
                .getAttribute("value")
                .then(valueOfElement => {
                expect(valueOfElement).toEqual(value, "Value of (" +
                    locatorUtil.getLocator(locator).description +
                    ") should be " +
                    value +
                    ", actual is " +
                    valueOfElement);
            });
        });
    }
    assertNotValue(locator, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (value.startsWith("${")) {
                value = properties.get(value.substring(2, value.length - 1));
            }
            yield protractor_1.element(locatorUtil.getLocator(locator).locator)
                .getAttribute("value")
                .then(valueOfElement => {
                expect(valueOfElement).not.toEqual(value, "Value of (" +
                    locatorUtil.getLocator(locator).description +
                    ") should not be " +
                    value +
                    ", actual is " +
                    valueOfElement);
            });
        });
    }
    assertVisible(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            let condition = EC.presenceOf(protractor_1.element(locatorUtil.getLocator(locator).locator));
            yield protractor_1.browser.wait(condition, 5000).catch(reason => {
                expect(reason).toBeUndefined("Element (" +
                    locatorUtil.getLocator(locator).description +
                    ") was not present");
            });
            expect(yield protractor_1.element(locatorUtil.getLocator(locator).locator).isDisplayed()).toBe(true);
        });
    }
    assertNotVisible(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            let condition = EC.presenceOf(protractor_1.element(locatorUtil.getLocator(locator).locator));
            yield protractor_1.browser.wait(condition, 5000).catch(reason => {
                expect(reason).toBeUndefined("Element was not present");
            });
            expect(yield protractor_1.element(locatorUtil.getLocator(locator).locator).isDisplayed()).toBe(false);
        });
    }
    waitForElement(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForPresence(locator);
        });
    }
    waitForVisible(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            let condition = EC.presenceOf(protractor_1.element(locatorUtil.getLocator(locator).locator));
            yield protractor_1.browser.wait(condition, 5000).catch(reason => {
                expect(reason).toBeUndefined("Element (" +
                    locatorUtil.getLocator(locator).description +
                    ") was not present");
            });
            condition = EC.visibilityOf(protractor_1.element(locatorUtil.getLocator(locator).locator));
            yield protractor_1.browser.wait(condition, 5000).catch(reason => {
                expect(reason).toBeUndefined("Element (" +
                    locatorUtil.getLocator(locator).description +
                    ") was not visible");
            });
        });
    }
    switchToFrame(nameOrIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (locatorUtil.getLocator(nameOrIndex).actualLocatorString.includes("=")) {
                    yield protractor_1.protractor.browser
                        .switchTo()
                        .frame(locatorUtil
                        .getLocator(nameOrIndex)
                        .actualLocatorString.split("=", 2)[1]);
                }
                else {
                    yield protractor_1.protractor.browser.switchTo().frame(nameOrIndex);
                }
            }
            catch (_a) {
                yield protractor_1.protractor.browser.switchTo().frame(nameOrIndex);
            }
        });
    }
    switchToDefaultContent() {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.protractor.browser.switchTo().defaultContent();
        });
    }
    getRepeaterElements(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.element.all(locatorUtil.getLocator(locator).locator);
        });
    }
    getByElement(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.element(locatorUtil.getLocator(locator).locator);
        });
    }
    clickDynamicLocators(locator, dynamicValue) {
        return __awaiter(this, void 0, void 0, function* () {
            if (dynamicValue.startsWith("${")) {
                dynamicValue = properties.get(dynamicValue.substring(2, dynamicValue.length - 1));
            }
            protractor_1.element(locatorUtil.getLocator(locator, dynamicValue)).click();
        });
    }
}
exports.CommonSteps = CommonSteps;
