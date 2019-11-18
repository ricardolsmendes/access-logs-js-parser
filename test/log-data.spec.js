import assert from 'assert';

import LogData from '../app/log-data';

describe('LogData', function() {

    describe('constructor', function() {

        it('sets the remoteAddr attribute', function() {
            let logData = new LogData('remoteAddr');
            assert.equal(logData.remoteAddr, 'remoteAddr');
        });

    });

});
