"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const validator_1 = require("./../base/validator");
const commonsteps_1 = require("../base/commonsteps");
let validator = new validator_1.Validator();
let actions = new commonsteps_1.CommonSteps();
class LoginPage {
    openLoginPage(searchKeyword) {
        protractor_1.browser.get(protractor_1.browser.baseUrl);
        protractor_1.browser.driver
            .manage()
            .window()
            .maximize();
    }
    login(username, password) {
        actions.sendKeys('login.username.loc', username);
        actions.sendKeys('login.password.loc', password);
        actions.click('login.submit.btn.loc');
    }
    verifyPage() {
        validator.verifyPresent('login.username.loc');
    }
    verifyPlaceholders() {
        actions.click('login.username.loc');
        validator.verifyAttribute('login.username.loc', 'placeholder', 'Username');
        actions.click('login.password.loc');
        validator.verifyAttribute('login.password.loc', 'placeholder', 'Password');
    }
    verifyValidationErrors() {
        actions.click('login.username.loc');
        validator.verifyVisible('login.password.erricon.loc');
        validator.verifyText('login.password.errmsg.loc', 'Password is required.');
        actions.click('login.submit.btn.loc');
        validator.verifyVisible('login.username.erricon.loc');
        validator.verifyText('login.username.errmsg.loc', 'Username is required.');
        validator.verifyVisible('login.password.erricon.loc');
        validator.verifyText('login.password.errmsg.loc', 'Password is required.');
    }
}
exports.LoginPage = LoginPage;
