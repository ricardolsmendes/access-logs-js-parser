class LogData {

    /**
     * @param {string} remoteAddr
     * @param {string} remoteUser
     * @param {dateTime} dateTime
     * @param {string} request
     * @param {number} status
     * @param {number} bytesSent
     * @param {string} httpReferer
     * @param {string} userAgent
     */
    constructor(remoteAddr, remoteUser, dateTime, request, status, bytesSent, httpReferer, userAgent) {
        this._remoteAddr = remoteAddr;
        this._remoteUser = remoteUser;
        this._dateTime = dateTime;
        this._request = request;
        this._status = status;
        this._bytesSent = bytesSent;
        this._httpReferer = httpReferer;
        this._userAgent = userAgent;
    }

    get remoteAddr() {
        return this._remoteAddr;
    }

    get remoteUser() {
        return this._remoteUser;
    }

    get dateTime() {
        return this._dateTime;
    }

    get request() {
        return this._request;
    }

    get status() {
        return this._status;
    }

    get bytesSent() {
        return this._bytesSent;
    }

    get httpReferer() {
        return this._httpReferer;
    }

    get userAgent() {
        return this._userAgent;
    }
}

export default LogData;
