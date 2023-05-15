"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.getLogger = void 0;
var tslog_1 = require("tslog");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return tslog_1.Logger; } });
var mainLogger = new tslog_1.Logger({
    type: 'pretty',
    name: 'Buttercat',
    minLevel: 2,
    prettyLogTemplate: '{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{name}} {{logLevelName}}\t[{{fileNameWithLine}}]\t',
});
mainLogger.info('Logger initialized');
var getLogger = function (settings, logObj) {
    return mainLogger.getSubLogger(settings, logObj);
};
exports.getLogger = getLogger;
