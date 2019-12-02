import assert from 'assert';

import LogData from '../src/log-data';

describe('LogData', function() {

  describe('constructor', function() {

    it('sets the remoteHost attribute', function() {
      const logData = new LogData('remoteHost');
      assert.strictEqual(logData.remoteHost, 'remoteHost');
    });

  });

});
