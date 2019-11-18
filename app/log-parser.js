import LogData from './log-data';

class LogParser {

    /**
     * @param {string} pattern
     */
    constructor(pattern) {
        this._regexp = new RegExp(pattern);
    }

    /**
     * @param {string} newPattern
     */
    set pattern(newPattern) {
        this._regexp = new RegExp(newPattern);
    }

    /**
     * @param {string} log
     */
    parse(log) {
        const matchObj = this._regexp.exec(log);

        return new LogData(
            matchObj.groups.remoteAddr,
            matchObj.groups.remoteUser,
            matchObj.groups.dateTime,
            matchObj.groups.request,
            matchObj.groups.status,
            matchObj.groups.bytesSent,
            matchObj.groups.httpReferer,
            matchObj.groups.userAgent
        );
    }
}

export default LogParser;
