//global.Promise = require('bluebird');
// zone.js を読み込む
require('zone.js/dist/zone-node');
//require('zones-proposal');

const sleep = (millis) => new Promise((resolve) => setTimeout(resolve, millis));

// zoneを作る
Zone.current.fork({
  name: 'zone1',
  beforeTask: () => console.log('start1---'),
  afterTask: () => console.log('end1---'),
  properties: { context:'<0001>' }
}).run(() => main());

// zoneを作る
Zone.current.fork({
  name: 'zone2',
  beforeTask: () => console.log('start2---'),
  afterTask: () => console.log('end2---'),
  properties: { context:'<0002>' }
}).run(() => main());

function main () {
  mainA();
  sleep(2000).then(mainB);
}

function mainA () {
  async_log('Hello');
  sleep(500).then(() => {
    async_log('World');
    return sleep(500);
  }).then(() => async_log('!'));
}

async function mainB() {
  async_log('Hello');
  await sleep(500);
  async_log('World');
  await sleep(500);
  async_log('!');
}

function async_log(msg) {
  console.log(Zone.current.name, msg);
}

function log(str) {
  Zone.root.run(function() {
    console.log(str);
  });
}
/*
function foo() {
  Zone.current.fork({
    name: 'fooZone', 
    onScheduleTask: function(delegate, curr, target, task) {
      log('Zone begin to schedule task not async yet ' + task.source);
      return delegate.scheduleTask(target, task);
    },
    onInvokeTask: function(delegate, curr, target, task, applyThis, applyArgs) {
      log('~~~~Zone before invoke async callback~~~~' + task.source);
      delegate.invokeTask(target, task, applyThis, applyArgs);
      log('~~~~Zone after invoke async callback~~~~' + task.source);
    },
  }).run(function() {
    log('current zone, ' + Zone.current.name);
    setTimeout(function() {
      log('timeout is up, ', Zone.current.name);
    }, 100);
  });
};

foo();
*/
