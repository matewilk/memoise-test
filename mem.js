const memoise = require('memoizee');

module.exports = (time, cb) => {
  const opt = { maxAge: time, promise: true };
  const mem = memoise(cb, opt);

  return mem;
};
