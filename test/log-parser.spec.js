'use strict';

const assert = require('assert');
const sinon = require('sinon');

const tomcatAccessLogParser = require('tomcat-access-log-parser');

const { LogData, LogParser } = require('../src');

describe('LogParser', function() {

  var logParser;

  beforeEach(() => {
    logParser = new LogParser();
  });

  describe('parseAllTomcatCommonFormat', function() {

    it('calls tomcatAccessLogParser.parseCommonFormat()', function() {
      const stub = sinon.stub(tomcatAccessLogParser, 'parseCommonFormat').callsFake(
        () => JSON.stringify({}));

      logParser.parseTomcatCommonFormat('127.0.0.1 ...');

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

      const logData = logParser.parseTomcatCommonFormat('127.0.0.1 ...');

      assert.deepStrictEqual(logData, new LogData(
        '127.0.0.1', 'user-id', new Date('2019-12-09T21:00:00.000Z'),
        'GET index.html', 200, 482));

      stub.restore();
    });

  });

  describe('parseAllTomcatCommonFormat', function() {

    it('calls parseTomcatCommonFormat for each line', function() {
      sinon.stub(logParser, 'parseTomcatCommonFormat').callsFake((line) =>
        `parsed ${line}`);

      const logs = logParser.parseAllTomcatCommonFormat(['line 1', 'line 2']);

      sinon.assert.calledTwice(logParser.parseTomcatCommonFormat);
      assert.deepStrictEqual(logs, ['parsed line 1', 'parsed line 2']);
    });

  });

});
