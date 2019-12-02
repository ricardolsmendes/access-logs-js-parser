import tomcatAccessLogParser from 'tomcat-access-log-parser';

import LogData from './log-data';

class LogParser {

  /**
   * @param {string} line
   */
  parseTomcatCommonFormat(line) {

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
