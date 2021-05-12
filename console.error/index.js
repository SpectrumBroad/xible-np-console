'use strict';

const util = require('util');

function log(str, NODE) {
  console.error(str);

  if (typeof str !== 'string') {
    str = util.inspect(str);
  }

  NODE.addStatus({
    message: str,
    timeout: 3000,
    color: 'red'
  });
}

module.exports = (NODE) => {
  const triggerIn = NODE.getInputByName('trigger');

  const doneOut = NODE.getOutputByName('done');

  triggerIn.on('trigger', async (conn, state) => {
    (await NODE.getData('data', state))
      .forEach((data) => {
        log(data, NODE);
      });

    doneOut.trigger(state);
  });
};
