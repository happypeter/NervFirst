const nervos = require('./nervos')
const transaction = {
  from: nervos.appchain.accounts.wallet[0].address,
  privateKey: nervos.appchain.accounts.wallet[0].privateKey,
  value: '0x0',
  nonce: 999990,
  quota: 1000000,
  chainId: 1,
  version: 0,
  validUntilBlock: 999999
}

module.exports = transaction
