'use strict';

const tomcatAccessLogParser = require('tomcat-access-log-parser');

class LogParser {

  /**
   * @param {string} line
   * @param {string} jsonKeysCase
   */
  parseTomcatCommonFormat(line, jsonKeysCase = 'default') {
    const logString = jsonKeysCase === 'snake'
      ? tomcatAccessLogParser.parseCommonFormatSnakeCaseKeys(line)
      : tomcatAccessLogParser.parseCommonFormat(line);

    const log = JSON.parse(logString);

    if (log.datetime && typeof log.datetime === 'string') {
      log.datetime = new Date(log.datetime);
    }

    return log;
  }

  /**
   * @param {Array} lines
   * @param {string} jsonKeysCase
   */
  parseAllTomcatCommonFormat(lines, jsonKeysCase = 'default') {
    const parsedLines = [];
    const self = this;

    lines.forEach(line => {
      parsedLines.push(self.parseTomcatCommonFormat(line));
    });

    return parsedLines;
  }

}

module.exports = { LogParser: LogParser };
