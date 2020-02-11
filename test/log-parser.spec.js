'use strict';

const assert = require('assert');
const sinon = require('sinon');

const tomcatAccessLogParser = require('tomcat-access-log-parser');

const { LogParser } = require('../src');

describe('LogParser', () => {

  var logParser;

  beforeEach(() => {
    logParser = new LogParser();
  });

  describe('parseTomcatCommonFormat', () => {

    it('returns a JSON object', () => {
      const fakeLogData = {
        remoteHost: '127.0.0.1',
        remoteUser: 'user-id',
        datetime: new Date('2019-12-09T21:00:00.000Z'),
        request: 'GET index.html',
        httpStatus: 200,
        bytesSent: 482
      };

      const stub = sinon.stub(tomcatAccessLogParser, 'parseCommonFormat').returns(JSON
        .stringify(fakeLogData));

      const parsedLogData = logParser.parseTomcatCommonFormat('127.0.0.1 ...');

      assert.deepStrictEqual(parsedLogData, fakeLogData);

      stub.restore();
    });

    it('parses into standard JSON by default', () => {
      const stub = sinon.stub(tomcatAccessLogParser, 'parseCommonFormat').returns(JSON
        .stringify({}));

      logParser.parseTomcatCommonFormat('127.0.0.1 ...');

      sinon.assert.calledOnce(tomcatAccessLogParser.parseCommonFormat);

      stub.restore();
    });

    it('parses into JSON with snake case keys when requested', () => {
      const stub = sinon.stub(tomcatAccessLogParser, 'parseCommonFormatSnakeCaseKeys')
        .returns(JSON.stringify({}));

      logParser.parseTomcatCommonFormat('127.0.0.1 ...', 'snake');

      sinon.assert.calledOnce(tomcatAccessLogParser.parseCommonFormatSnakeCaseKeys);

      stub.restore();
    });

    it('returns null when input is unparseable', () => {
      const stub = sinon.stub(tomcatAccessLogParser, 'parseCommonFormat').returns();

      const parsedLogData = logParser.parseTomcatCommonFormat('127.0.0.1');

      assert(!parsedLogData);

      stub.restore();
    });

  });

  describe('parseAllTomcatCommonFormat', () => {

    it('tries to parse all given lines', () => {
      sinon.stub(logParser, 'parseTomcatCommonFormat').callsFake(line =>
        `parsed ${line}`);

      const logs = logParser.parseAllTomcatCommonFormat(['line 1', 'line 2']);

      sinon.assert.calledTwice(logParser.parseTomcatCommonFormat);
      assert.deepStrictEqual(logs, ['parsed line 1', 'parsed line 2']);
    });

    it('ignores unparseable lines', () => {
      sinon.stub(logParser, 'parseTomcatCommonFormat').callsFake(line =>
        undefined);

      const logs = logParser.parseAllTomcatCommonFormat(['line 1', 'line 2']);

      sinon.assert.calledTwice(logParser.parseTomcatCommonFormat);
      assert.deepStrictEqual(logs, []);
    });

  });

});
