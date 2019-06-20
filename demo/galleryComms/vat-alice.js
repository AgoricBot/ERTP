import harden from '@agoric/harden';

function makeAliceMaker(E, log) {
  // TODO BUG: All callers should wait until settled before doing
  // anything that would change the balance before show*Balance* reads
  // it.
  function showPaymentBalance(name, paymentP) {
    return E(paymentP)
      .getBalance()
      .then(amount => log(name, ' balance ', amount));
  }

  return harden({
    make(gallery) {
      const alice = harden({
        splitTapFaucet() {
          E(gallery)
            .split(E(gallery).tapFaucet())
            .then(({ useRightPayment }) => {
              showPaymentBalance('useRight', useRightPayment);
              E(gallery).changeColor(useRightPayment, 'black');
            });
        },
      });
      return alice;
    },
  });
}

function setup(syscall, state, helpers) {
  function log(...args) {
    helpers.log(...args);
    console.log(...args);
  }
  return helpers.makeLiveSlots(syscall, state, E =>
    harden({
      makeAliceMaker() {
        return harden(makeAliceMaker(E, log));
      },
    }),
  );
}
export default harden(setup);
