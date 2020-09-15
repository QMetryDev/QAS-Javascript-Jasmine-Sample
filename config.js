"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configurationManager_1 = require("./base/configurationmanager");
let platform = configurationManager_1.ConfigurationManager.getBundle().get("platform");
console.log("Plarform is :" + platform);
exports.config = require('./resources/' + platform + '/env');
