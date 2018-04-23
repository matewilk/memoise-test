const { test } = require('ava');
const sinon = require('sinon');
// const delay = require('delay');
const lolex = require('lolex');


const myModule = require('../callback');
sinon.stub(myModule, 'callback');

const { callMe } = require('../index');

const clock = lolex.install();

test.beforeEach(() => {
  myModule.callback.returns(Promise.resolve('abc'));
});

test.afterEach(() => {
  myModule.callback.reset();
  clock.tick(2000)
});

test.after(() => {
  myModule.callback.restore();
  clock.uninstall();
});

test('calls callback once', async (t) => {
  await callMe();
  await callMe();

  t.true(myModule.callback.calledOnce)
});

const asyncFn = (t, v) => {
  // return delay(1005).then(async () => {
  //   await callMe();
  // });
  return new Promise((resolve) => {
    setTimeout(resolve.bind(null, v), t); // clock.setTimeout
    clock.tick(t)
  })
};

test('calls callback twice', async (t) => {
  t.plan(2);

  await callMe();

  return asyncFn(1005)
    .then(async () => {
      await callMe()
    })
    .then(function () {
      t.true(myModule.callback.calledTwice);
      t.pass();
    })
});