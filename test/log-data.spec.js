'use strict';

const assert = require('assert');

const { LogData } = require('../src');

describe('LogData', function() {

  describe('constructor', function() {

    it('sets the remoteHost attribute', function() {
      const logData = new LogData('127.0.0.1');
      assert.strictEqual(logData.remoteHost, '127.0.0.1');
    });

    it('sets the remoteUser attribute', function() {
      const logData = new LogData('127.0.0.1', 'user-id');
      assert.strictEqual(logData.remoteUser, 'user-id');
    });

    it('sets the datetime attribute', function() {
      const logData = new LogData(
        '127.0.0.1', 'user-id', new Date('2019-12-09T21:00:00.000Z'));
      assert.deepStrictEqual(logData.datetime, new Date('2019-12-09T21:00:00.000Z'));
    });

    it('sets the request attribute', function() {
      const logData = new LogData(
        '127.0.0.1', 'user-id', new Date('2019-12-09T21:00:00.000Z'), 'GET index.html'
      );
      assert.strictEqual(logData.request, 'GET index.html');
    });

    it('sets the httpStatus attribute', function() {
      const logData = new LogData(
        '127.0.0.1', 'user-id', new Date('2019-12-09T21:00:00.000Z'),
        'GET index.html', 200);
      assert.strictEqual(logData.httpStatus, 200);
    });

    it('sets the bytesSent attribute', function() {
      const logData = new LogData(
        '127.0.0.1', 'user-id', new Date('2019-12-09T21:00:00.000Z'),
        'GET index.html', 200, 482);
      assert.strictEqual(logData.bytesSent, 482);
    });

    it('sets the httpReferer attribute', function() {
      const logData = new LogData(
        '127.0.0.1', 'user-id', new Date('2019-12-09T21:00:00.000Z'),
        'GET index.html', 200, 482, 'http://referer.com');
      assert.strictEqual(logData.httpReferer, 'http://referer.com');
    });

    it('sets the userAgent attribute', function() {
      const logData = new LogData(
        '127.0.0.1', 'user-id', new Date('2019-12-09T21:00:00.000Z'),
        'GET index.html', 200, 482, 'http://referer.com', 'Chrome');
      assert.strictEqual(logData.userAgent, 'Chrome');
    });

  });

});
