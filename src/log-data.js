'use strict';

class LogData {

  /**
   * @param {string} remoteHost
   * @param {string} remoteUser
   * @param {Date} datetime
   * @param {string} request
   * @param {number} httpStatus
   * @param {number} bytesSent
   * @param {string} httpReferer
   * @param {string} userAgent
   */
  constructor(
    remoteHost, remoteUser, datetime, request, httpStatus, bytesSent, httpReferer, userAgent) {

    this.remoteHost = remoteHost;
    this.remoteUser = remoteUser;
    this.datetime = datetime;
    this.request = request;
    this.httpStatus = httpStatus;
    this.bytesSent = bytesSent;
    this.httpReferer = httpReferer;
    this.userAgent = userAgent;
  }

}

module.exports = { LogData: LogData };
