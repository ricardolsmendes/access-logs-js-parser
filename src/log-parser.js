import LogData from './log-data';

var tomcatAccessLogParser = require('tomcat-access-log-parser');

class LogParser {

  /**
   * @param {Array} lines
   */
  parseTomcatCommonFormat(lines) {
    parsedLines = [];
    lines.forEach(function(line) {
      parsedLines.append(this.parseTomcatCommonFormatLine(line))
    });
    return parsedLines;
  }

  /**
   * @param {string} line
   */
  parseTomcatCommonFormatLine(line) {
    const logString = tomcatAccessLogParser.parseCommonFormat(line);
    const logObject = JSON.parse(logString);

    return new LogData(
      logObject.remoteHost,
      logObject.remoteUser,
      logObject.datetime != null ? new Date(logObject.datetime) : null,
      logObject.request,
      logObject.httpStatus,
      logObject.bytesSent,
      null,
      null
    );
  }
}

export default LogParser;
