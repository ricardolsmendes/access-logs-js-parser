'use strict';

import LogData from '../src/log-data';
import LogParser from '../src/log-parser';

const assert = require('assert');
const sinon = require('sinon');

const tomcatAccessLogParser = require('tomcat-access-log-parser');

describe('LogParser', function() {

  var logParser;

  beforeEach(() => {
    logParser = new LogParser();
  });

  describe('parseTomcatCommonFormat', function() {

    it('calls parseTomcatCommonFormatLine for each line', function() {
      sinon.stub(logParser, 'parseTomcatCommonFormatLine').callsFake((line) => `parsed ${line}`);

      const logs = logParser.parseTomcatCommonFormat(['line 1', 'line 2']);

      sinon.assert.calledTwice(logParser.parseTomcatCommonFormatLine);
      assert.deepStrictEqual(logs, ['parsed line 1', 'parsed line 2']);
    });

  });

  describe('parseTomcatCommonFormatLine', function() {

    it('calls tomcatAccessLogParser.parseCommonFormat()', function() {
      const stub = sinon.stub(tomcatAccessLogParser, 'parseCommonFormat').callsFake(
        () => JSON.stringify({}));

      logParser.parseTomcatCommonFormatLine('127.0.0.1 ...');

      sinon.assert.calledOnce(tomcatAccessLogParser.parseCommonFormat);

      stub.restore();
    });

    it('parses tomcatAccessLogParser.parseCommonFormat() result', function() {
      const fakeReturn = {
        remoteHost: '127.0.0.1',
        remoteUser: 'user-id',
        datetime: new Date('2019-12-09T21:00:00.000Z'),
        request: 'GET index.html',
        httpStatus: 200,
        bytesSent: 482
      };

      const stub = sinon.stub(tomcatAccessLogParser, 'parseCommonFormat').callsFake(
        () => JSON.stringify(fakeReturn));

      const logData = logParser.parseTomcatCommonFormatLine('127.0.0.1 ...');

      assert.deepStrictEqual(logData, new LogData(
        '127.0.0.1', 'user-id', new Date('2019-12-09T21:00:00.000Z'), 'GET index.html', 200, 482));

      stub.restore();
    });

  });

});
