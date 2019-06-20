import { test } from 'tape-promise/tape';
import { loadBasedir, buildVatController } from '@agoric/swingset-vat';

async function main(withSES, basedir, argv) {
  const config = await loadBasedir(basedir);
  const ldSrcPath = require.resolve(
    '@agoric/swingset-vat/src/devices/loopbox-src',
  );
  config.devices = [['loopbox', ldSrcPath, {}]];

  const controller = await buildVatController(config, withSES, argv);
  await controller.run();
  return controller.dump();
}

const expectedTapFaucetLog = [
  '=> setup called',
  'starting tapFaucet',
  'alice is made',
  'starting testTapFaucet',
  '++ alice.doTapFaucet starting',
  'pixel from faucet balance {"label":{"issuer":{},"description":"pixels"},"quantity":[{"x":1,"y":4}]}',
];

test('run gallery demo tapFaucet with SES', async t => {
  const dump = await main(true, 'demo/gallery', ['tapFaucet']);
  t.deepEquals(dump.log, expectedTapFaucetLog);
  t.end();
});

test('run gallery demo tapFaucet without SES', async t => {
  const dump = await main(false, 'demo/gallery', ['tapFaucet']);
  t.deepEquals(dump.log, expectedTapFaucetLog);
  t.end();
});

const expectedAliceChangesColorLog = [
  '=> setup called',
  'starting aliceChangesColor',
  'alice is made',
  'starting testAliceChangesColor',
  '++ alice.doChangeColor starting',
  'tapped Faucet',
  'current color #000000',
  'pixel index is 100 of 100',
];

test('run gallery demo aliceChangesColor with SES', async t => {
  const dump = await main(true, 'demo/gallery', ['aliceChangesColor']);
  t.deepEquals(dump.log, expectedAliceChangesColorLog);
  t.end();
});

test('run gallery demo aliceChangesColor without SES', async t => {
  const dump = await main(false, 'demo/gallery', ['aliceChangesColor']);
  t.deepEquals(dump.log, expectedAliceChangesColorLog);
  t.end();
});

const expectedAliceSendsOnlyUseRightLog = [
  '=> setup called',
  'starting aliceSendsOnlyUseRight',
  'alice is made',
  'starting testAliceSendsOnlyUseRight',
  '++ alice.doOnlySendUseRight starting',
  'tapped Faucet',
  'pixel x:1, y:4 has original color #a90490',
  '++ bob.receiveUseRight starting',
  "pixel x:1, y:4 changed to bob's color #B695C0",
  "pixel x:1, y:4 changed to alice's color #9FBF95",
  'bob was unable to color: Error: no use rights present',
];

test('run gallery demo aliceSendsOnlyUseRight with SES', async t => {
  const dump = await main(true, 'demo/gallery', ['aliceSendsOnlyUseRight']);
  t.deepEquals(dump.log, expectedAliceSendsOnlyUseRightLog);
  t.end();
});

test('run gallery demo aliceSendsOnlyUseRight without SES', async t => {
  const dump = await main(false, 'demo/gallery', ['aliceSendsOnlyUseRight']);
  t.deepEquals(dump.log, expectedAliceSendsOnlyUseRightLog);
  t.end();
});

const expectedGalleryRevokesLog = [
  '=> setup called',
  'starting galleryRevokes',
  'starting testGalleryRevokes',
  '++ alice.doTapFaucetAndStore starting',
  '++ alice.checkAfterRevoked starting',
  'amount quantity should be an array of length 0: 0',
  'successfully threw Error: no use rights present',
];

test('run gallery demo galleryRevokes with SES', async t => {
  const dump = await main(true, 'demo/gallery', ['galleryRevokes']);
  t.deepEquals(dump.log, expectedGalleryRevokesLog);
  t.end();
});

test('run gallery demo galleryRevokes without SES', async t => {
  const dump = await main(false, 'demo/gallery', ['galleryRevokes']);
  t.deepEquals(dump.log, expectedGalleryRevokesLog);
  t.end();
});

const expectedAliceSellsAndBuysLog = [
  '=> setup called',
  'starting aliceSellsAndBuys',
  'starting testAliceSellsAndBuys',
  '++ alice.doSellAndBuy starting',
  'gallery escrow wins: {"label":{"issuer":{},"description":"pixels"},"quantity":[{"x":1,"y":4}]} refs: null',
  'alice escrow wins: {"label":{"issuer":{},"description":"dust"},"quantity":6} refs: null',
  'gallery escrow wins: {"label":{"issuer":{},"description":"dust"},"quantity":6} refs: null',
  'alice escrow 2 wins: {"label":{"issuer":{},"description":"pixels"},"quantity":[{"x":1,"y":4}]} refs: null',
  'alice pixel purse balance {"label":{"issuer":{},"description":"pixels"},"quantity":[{"x":1,"y":4}]}',
  'alice dust purse balance {"label":{"issuer":{},"description":"dust"},"quantity":0}',
];

test('run gallery demo aliceSellsAndBuys with SES', async t => {
  const dump = await main(true, 'demo/gallery', ['aliceSellsAndBuys']);
  t.deepEquals(dump.log, expectedAliceSellsAndBuysLog);
  t.end();
});

test('run gallery demo aliceSellsAndBuys without SES', async t => {
  const dump = await main(false, 'demo/gallery', ['aliceSellsAndBuys']);
  t.deepEquals(dump.log, expectedAliceSellsAndBuysLog);
  t.end();
});

const splitTapFaucetLog = [
  '=> setup called',
  'starting splitTapFaucet',
  'starting testSplitTapFaucet',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":1,"y":4}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":2,"y":2}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":3,"y":0}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":3,"y":8}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":4,"y":6}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":5,"y":4}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":6,"y":2}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":7,"y":0}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":7,"y":8}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":8,"y":6}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":9,"y":4}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":0,"y":2}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":1,"y":0}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":1,"y":9}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":2,"y":8}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":3,"y":7}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":4,"y":7}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":5,"y":6}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":6,"y":5}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":7,"y":4}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":8,"y":3}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":9,"y":2}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":0,"y":1}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":1,"y":1}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":2,"y":1}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":3,"y":2}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":4,"y":2}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":5,"y":2}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":6,"y":3}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":7,"y":3}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":8,"y":4}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":9,"y":5}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":0,"y":5}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":1,"y":6}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":2,"y":7}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":4,"y":0}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":5,"y":1}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":6,"y":4}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":7,"y":6}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":8,"y":8}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":9,"y":9}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":1,"y":2}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":2,"y":5}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":3,"y":9}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":5,"y":3}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":6,"y":7}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":8,"y":0}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":9,"y":3}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":0,"y":7}]}',
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":2,"y":3}]}',
];

test('split the returned value of tapFaucet with SES', async t => {
  const dump = await main(true, 'demo/gallery', ['splitTapFaucet']);
  t.deepEquals(dump.log, splitTapFaucetLog);
  t.end();
});

test('split the returned value of tapFaucet without SES', async t => {
  const dump = await main(false, 'demo/gallery', ['splitTapFaucet']);
  t.deepEquals(dump.log, splitTapFaucetLog);
  t.end();
});

const splitTapFaucetAcrossMachinesLog = [
  '=> setup called',
  '=> setup called',
  'addEgress called with sender alice, index 0, valslot [object Object]',
  'addIngress called with machineName gallery, index 0',
  "=> the promise given by the call to alice.splitTapFaucet resolved to 'undefined'",
  'useRight balance {"label":{"issuer":{},"description":"pixelUseRights"},"quantity":[{"x":1,"y":4}]}',
];

test('split the returned value of tapFaucet across machines with SES', async t => {
  const dump = await main(true, 'demo/galleryComms', ['splitTapFaucet']);
  t.deepEquals(dump.log, splitTapFaucetAcrossMachinesLog);
  t.end();
});

test.only('split the returned value of tapFaucet across machines without SES', async t => {
  const dump = await main(false, 'demo/galleryComms', ['splitTapFaucet']);
  t.deepEquals(dump.log, splitTapFaucetAcrossMachinesLog);
  t.end();
});
