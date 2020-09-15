"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const fsExtra = require("fs-extra");
const MetaInfo_1 = require("./metainfo/MetaInfo");
const path = require("path");
const global_1 = require("./global");
const JsonMetaInfo_1 = require("./metainfo/JsonMetaInfo");
const BrowserDesiredCapabilities_1 = require("./overview/BrowserDesiredCapabilities");
const BrowserActualCapabilities_1 = require("./overview/BrowserActualCapabilities");
const IsfwBuildInfo_1 = require("./overview/IsfwBuildInfo");
const RunParameters_1 = require("./overview/RunParameters");
const ExecutionEnvInfo_1 = require("./overview/ExecutionEnvInfo");
const EnvInfo_1 = require("./overview/EnvInfo");
const Overview_1 = require("./overview/Overview");
const ScenarioMetaInfo_1 = require("./metainfo/ScenarioMetaInfo");
const ScenarioMetadata_1 = require("./metainfo/ScenarioMetadata");
const SeleniumLog_1 = require("./sample-test/SeleniumLog");
const CheckPoints_1 = require("./sample-test/CheckPoints");
const SampleTest_1 = require("./sample-test/SampleTest");
const metaInfoJson = path.join(process.cwd(), '/test-results/meta-info.json');
const cucumberReportJsonPath = path.join(process.cwd(), '/test-results/' + global_1.Global.executionTimeStamp + '/json/cucumber_report.json');
const rootMetaPath = 'test-results/meta-info.json';
function createRootMetaInfo(executionTimeStamp) {
    var rootMeta = { 'reports': [] };
    if (fs.existsSync(rootMetaPath)) {
        rootMeta = JSON.parse(fs.readFileSync(rootMetaPath, 'UTF-8'));
    }
    let currentMeta = new MetaInfo_1.MetaInfo('QAF Demo', 'test-results/' + executionTimeStamp + '/json', new Date().getTime());
    rootMeta['reports'].unshift(currentMeta);
    fsExtra.ensureFileSync(metaInfoJson);
    fs.writeFileSync(metaInfoJson, JSON.stringify(rootMeta, null, 4));
}
function setPassFailSkipStableTotal(json, jsonMetaInfo, failFlag, total, suitName) {
    let totalKey = suitName + ' total';
    let passKey = suitName + ' ' + 'passed';
    let failKey = suitName + ' ' + 'failed';
    let skipKey = suitName + ' ' + 'skipped';
    if (json.passed == true) {
        jsonMetaInfo.pass++;
        failFlag = false;
        global_1.Global.hashMap.set(passKey, (global_1.Global.hashMap.get(passKey) === undefined
            ? 1 : parseInt(global_1.Global.hashMap.get(passKey)) + 1));
    }
    if (json.pending) {
        jsonMetaInfo.skip++;
        failFlag = false;
        global_1.Global.hashMap.set(skipKey, (global_1.Global.hashMap.get(skipKey) === undefined
            ? 1 : parseInt(global_1.Global.hashMap.get(skipKey)) + 1));
    }
    if (failFlag) {
        global_1.Global.hashMap.set(failKey, (global_1.Global.hashMap.get(failKey) === undefined
            ? 1 : parseInt(global_1.Global.hashMap.get(failKey)) + 1));
        jsonMetaInfo.fail++;
        jsonMetaInfo.status = 'unstable';
    }
    global_1.Global.hashMap.set(totalKey, (global_1.Global.hashMap.get(totalKey) === undefined
        ? 1 : parseInt(global_1.Global.hashMap.get(totalKey)) + 1));
    jsonMetaInfo.total = total;
    return jsonMetaInfo;
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
function createMetaInfoInJson() {
    const jsonMetaInfoJson = path.join(process.cwd(), '/test-results/' + global_1.Global.executionTimeStamp + '/json/meta-info.json');
    const jsonFolder = path.join(process.cwd(), '/test-results/' + global_1.Global.executionTimeStamp + '/jsons');
    const jsonReports = path.join(process.cwd(), '/test-results/' + global_1.Global.executionTimeStamp + '/json');
    let pass = 0;
    let skip = 0;
    let fail = 0;
    let total = 0;
    let startTimeArray = [];
    let totalDuration = 0;
    let caseArray = [];
    let suitArray = [];
    let status = 'stable';
    let jsonMetaInfo;
    let uniqueScenarioArray = [];
    global_1.Global.hashMap = new Map();
    // START
    // Loop each files of 'jsons' folder
    fs.readdirSync(jsonFolder).forEach(file => {
        let json = JSON.parse(fs.readFileSync(jsonFolder + path.sep + file, 'UTF-8'));
        let failFlag = true;
        let splitArray = json.description.split('|');
        caseArray.push(splitArray[0]);
        suitArray.push(splitArray[1]);
        let caseKey = splitArray[1];
        // START
        // set classes for overview.json
        let suitCaseNameArray = [];
        if (global_1.Global.hashMap.get(caseKey) === undefined) {
            suitCaseNameArray.push(splitArray[0]);
        }
        else {
            suitCaseNameArray = global_1.Global.hashMap.get(caseKey);
            suitCaseNameArray.push(splitArray[0]);
        }
        global_1.Global.hashMap.set(caseKey, suitCaseNameArray);
        // END
        startTimeArray.push(json.timestamp);
        totalDuration = totalDuration + json.duration;
        total++;
        // START
        // set starttime and duration for overview.json
        let startTimeKey = caseKey + ' ' + 'startTime';
        let durationKey = caseKey + ' ' + 'duration';
        if (global_1.Global.hashMap.get(startTimeKey) === undefined &&
            global_1.Global.hashMap.get(durationKey) == undefined) {
            global_1.Global.hashMap.set(startTimeKey, json.timestamp);
            global_1.Global.hashMap.set(durationKey, json.duration);
        }
        else {
            if (parseInt(global_1.Global.hashMap.get(startTimeKey)) >
                parseInt(json.timestamp)) {
                global_1.Global.hashMap.set(startTimeKey, json.timestamp);
            }
            let durationTotal = parseInt(global_1.Global.hashMap.get(durationKey)) + parseInt(json.duration);
            global_1.Global.hashMap.set(durationKey, durationTotal);
        }
        global_1.Global.hashMap.set(caseKey, suitCaseNameArray);
        // END
        global_1.Global.hashMap.set(caseKey + ' browser', json.browser.name);
        jsonMetaInfo = (global_1.Global.hashMap.get('jsonMetaInfo') === undefined) ?
            new JsonMetaInfo_1.JsonMetaInfo('QAF Report', 'stable', caseArray, total, pass, fail, skip, json.timestamp, json.timestamp + totalDuration)
            :
                global_1.Global.hashMap.get('jsonMetaInfo');
        uniqueScenarioArray.push(splitArray[1]);
        jsonMetaInfo = setPassFailSkipStableTotal(json, jsonMetaInfo, failFlag, total, splitArray[1]);
        global_1.Global.hashMap.set('jsonMetaInfo', jsonMetaInfo);
        failFlag = false;
        let featureDir = jsonReports + path.sep + splitArray[1] + path.sep + splitArray[0];
        createMetaInfoInScenario(featureDir, json);
        createScenario(featureDir, json, splitArray[0]);
    });
    // END
    jsonMetaInfo.tests = uniqueScenarioArray.filter(onlyUnique);
    jsonMetaInfo.startTime = Math.min.apply(Math, startTimeArray);
    jsonMetaInfo.endTime = jsonMetaInfo.startTime + totalDuration;
    global_1.Global.hashMap.set('jsonMetaInfo', jsonMetaInfo);
    fsExtra.ensureFileSync(jsonMetaInfoJson);
    fs.writeFileSync(jsonMetaInfoJson, JSON.stringify(global_1.Global.hashMap.get('jsonMetaInfo', null, 4)));
    // START
    // Create overview.json block
    uniqueScenarioArray.forEach(scenarioName => {
        let startTimeKey = scenarioName + ' ' + 'startTime';
        let durationKey = scenarioName + ' ' + 'duration';
        let endTime = parseInt(global_1.Global.hashMap.get(startTimeKey)) +
            parseInt(global_1.Global.hashMap.get(durationKey));
        createOverview(scenarioName, global_1.Global.hashMap.get(scenarioName), scenarioName, global_1.Global.hashMap.get(startTimeKey), endTime);
    });
    // END
}
function setStatus(scenario) {
    let status = 'pass';
    let failFlag = true;
    if (scenario.passed) {
        status = 'pass';
        failFlag = false;
    }
    if (scenario.pending) {
        status = 'skip';
        failFlag = false;
    }
    if (failFlag) {
        status = 'fail';
    }
    return status;
}
function createScenario(sampleTestJson, scenario, scenarioName) {
    let args = ['[/]'];
    let subLogs = [];
    let seleniumLogArray = [];
    let checkPointsArray = [];
    let status = setStatus(scenario);
    if (status == 'pass') {
        let checkPoints = new CheckPoints_1.CheckPoints('Message: ' + ' '
            + 'Success', 'TestStepPass', scenario.duration, 0, []);
        checkPointsArray.push(checkPoints);
    }
    else if (status == 'fail') {
        let checkPoints = new CheckPoints_1.CheckPoints('Error Message: ' + ' '
            + scenario.message, 'TestStepFail', scenario.duration, 0, []);
        checkPointsArray.push(checkPoints);
    }
    let seleniumLog = new SeleniumLog_1.SeleniumLog('get', args, status, subLogs, scenario.duration);
    seleniumLogArray.push(seleniumLog);
    let sampleTest = new SampleTest_1.SampleTest(seleniumLogArray, checkPointsArray, scenario.message);
    fs.writeFileSync(sampleTestJson + path.sep + scenarioName + '.json', JSON.stringify(sampleTest,null, 4));
}
function createMetaInfoInScenario(scenarioMetaInfoJson, scenario) {
    let splitArray = scenario.description.split('|');
    var scenarioMeta = { 'methods': [] };
    let senarioMetaData = new ScenarioMetadata_1.ScenarioMetaData(splitArray[0], [], 11, splitArray[0], 'REFERECE', 'SIGN');
    let status = setStatus(scenario);
    let scenarioMetaInfo = new ScenarioMetaInfo_1.ScenarioMetaInfo(1, 'test', [], senarioMetaData, [], scenario.timestamp, scenario.duration, status, 0.0);
    scenarioMeta.methods.push(scenarioMetaInfo);
    fsExtra.ensureFileSync(scenarioMetaInfoJson + '/meta-info.json');
    fs.writeFileSync(scenarioMetaInfoJson + '/meta-info.json', JSON.stringify(scenarioMeta, null, 4));
}
function createOverview(scenarioName, scenarioDirsArray, scenarioCaseName, minStart, maxEnd) {
    const jsonReports = path.join(process.cwd(), '/test-results/' + global_1.Global.executionTimeStamp + '/json');
    let browserDesiredCapabilities = new BrowserDesiredCapabilities_1.BrowserDesiredCapabilities('chrome', true, true, '', 'ANY', true);
    let browserActualCapabilities = new BrowserActualCapabilities_1.BrowserActualCapabilities();
    let browserName = global_1.Global.hashMap.get(scenarioName + ' browser');
    let isfwBuildInfo = new IsfwBuildInfo_1.IsfwBuildInfo(browserName, '10', '2.1', '03-Jan-2017 14:01:00');
    let runParameters = new RunParameters_1.RunParameters('resources/testdata', 'scenarios/android', 'http://www.replacedbufiles.org', 'resources/testdata;resources/android');
    let executionEnvInfo = new ExecutionEnvInfo_1.ExecutionEnvInfo('64', 'Oracle Corporation', '1.8.0_172', 'x86_64', 'Administrators-MacBook-Pro-2.local', 'Mac OS X', 'shalinshah', '10.13.6');
    let envInfo = new EnvInfo_1.EnvInfo(browserDesiredCapabilities, browserActualCapabilities, isfwBuildInfo, runParameters, executionEnvInfo);
    let passKey = scenarioCaseName + ' ' + 'passed';
    let failKey = scenarioCaseName + ' ' + 'failed';
    let skipKey = scenarioCaseName + ' ' + 'skipped';
    let totalKey = scenarioCaseName + ' total';
    let totalValue = (global_1.Global.hashMap.get(totalKey) === undefined ? 0 : global_1.Global.hashMap.get(totalKey));
    let passValue = (global_1.Global.hashMap.get(passKey) === undefined ? 0 : global_1.Global.hashMap.get(passKey));
    let failValue = (global_1.Global.hashMap.get(failKey) === undefined ? 0 : global_1.Global.hashMap.get(failKey));
    let skipValue = (global_1.Global.hashMap.get(skipKey) === undefined ? 0 : global_1.Global.hashMap.get(skipKey));
    let overview = new Overview_1.Overview(totalValue, passValue, failValue, skipValue, scenarioDirsArray, envInfo, minStart, maxEnd);
    let jsonString = Overview_1.Overview.formatFieldNames(JSON.stringify(overview, null, 4));
    let dir = jsonReports + path.sep + scenarioName + '/overview.json';
    fsExtra.ensureFileSync(dir);
    fs.writeFileSync(dir, jsonString);
}
class SpecReporter {
    jasmineStarted(suiteInfo) {
        createRootMetaInfo(global_1.Global.executionTimeStamp);
    }
    jasmineDone(runDetails) {
        createMetaInfoInJson();
    }
    suiteStarted(result) {
    }
    suiteDone(result) {
    }
    specStarted(result) {
    }
    specDone(result) {
    }
    runDetailsToResult(runDetails) {
        return {
            description: 'Non-spec failure',
            failedExpectations: runDetails.failedExpectations.map(expectation => {
                return {
                    actual: '',
                    expected: '',
                    matcherName: '',
                    message: expectation.message,
                    passed: false,
                    stack: expectation.stack,
                };
            }),
            fullName: 'Non-spec failure',
            id: 'Non-spec failure',
        };
    }
}
exports.SpecReporter = SpecReporter;
