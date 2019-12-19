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

    this._remoteHost = remoteHost;
    this._remoteUser = remoteUser;
    this._datetime = datetime;
    this._request = request;
    this._httpStatus = httpStatus;
    this._bytesSent = bytesSent;
    this._httpReferer = httpReferer;
    this._userAgent = userAgent;
  }

  get remoteHost() { return this._remoteHost; }

  get remoteUser() { return this._remoteUser; }

  get datetime() { return this._datetime; }

  get request() { return this._request; }

  get httpStatus() { return this._httpStatus; }

  get bytesSent() { return this._bytesSent; }

  get httpReferer() { return this._httpReferer; }

  get userAgent() { return this._userAgent; }

}

module.exports = { LogData: LogData };
