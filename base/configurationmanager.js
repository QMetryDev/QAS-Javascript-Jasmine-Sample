"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PropertiesReader = require("properties-reader");
const fs = require("fs");
class ConfigurationManager {
    constructor() {
        if (!ConfigurationManager.properties) {
            ConfigurationManager.properties = PropertiesReader('resources/application.properties');
            if (ConfigurationManager.properties
                .get('env.default.locale') !== undefined && ConfigurationManager.properties
                    .get('env.default.locale') !== null && ConfigurationManager.defaultLocale === undefined) {
                ConfigurationManager.defaultLocale = ConfigurationManager.properties
                    .get('env.default.locale');
            }
            ConfigurationManager.setup();
        }
    }
    static setup() {
        let resourceStrng = ConfigurationManager.properties
            .get('env.resources')
            .toString();
        let resourcesToLoad = resourceStrng.split(';');
        for (let resource in resourcesToLoad) {
            console.log('loading from ' + resourcesToLoad[resource]);
            ConfigurationManager.load(resourcesToLoad[resource]);
        }
    }
    static load(path) {
        if (fs.lstatSync(path).isDirectory()) {
            fs.readdirSync(path).map(function (child) {
                return ConfigurationManager.load(path + '/' + child);
            });
        }
        else if (path.endsWith('.loc') || path.endsWith('.properties') || path.endsWith('.' + ConfigurationManager.defaultLocale)) {
            this.properties.append(path);
        }
    }
    static getBundle() {
        return this.properties;
    }
}
exports.ConfigurationManager = ConfigurationManager;
new ConfigurationManager();
