const { callback } = require('./callback');
const mem = require('./mem');

const memoise = mem(1000, callback);

const callMe = async () => {
  let result = await memoise();

  return result;
};

module.exports = { callMe };
