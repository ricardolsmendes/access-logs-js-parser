'use strict';

const tomcatAccessLogParser = require('tomcat-access-log-parser');

const { LogData } = require('./log-data');

class LogParser {

  /**
   * @param {string} line
   */
  parseTomcatCommonFormat(line) {
    const logString = tomcatAccessLogParser.parseCommonFormat(line);
    const log = JSON.parse(logString);

    return new LogData(
      log.remoteHost,
      log.remoteUser,
      log.datetime != null ? new Date(log.datetime) : null,
      log.request,
      log.httpStatus,
      log.bytesSent
    );
  }

  /**
   * @param {Array} lines
   */
  parseAllTomcatCommonFormat(lines) {
    const parsedLines = [];
    const self = this;

    lines.forEach(function(line) {
      parsedLines.push(self.parseTomcatCommonFormat(line));
    });

    return parsedLines;
  }

}

module.exports = { LogParser: LogParser };
