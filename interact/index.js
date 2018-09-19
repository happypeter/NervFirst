const nervos = require('./nervos')
const simpleStore = require('./simpleStore')
const text = `hello ${new Date()}`
const time = new Date()
;(async function() {
  const current = await nervos.appchain.getBlockNumber()
  const tx = {
    ...simpleStore.transaction,
    validUntilBlock: +current + 88
  }
  const res = await simpleStore.simpleStoreContract.methods
    .add(text, +time)
    .send(tx)

  const receipt = await nervos.listeners.listenToTransactionReceipt(res.hash)
  receipt.errorMessage && console.log(receipt.errorMessage)
  const from =
    nervos.appchain.accounts.wallet[0] &&
    nervos.appchain.accounts.wallet[0].address

  console.log('from', from)

  const times = await simpleStore.simpleStoreContract.methods.getList().call({
    from
  })
  console.log('times', times)
  const messages = await Promise.all(
    times.map(time =>
      simpleStore.simpleStoreContract.methods.get(time).call({ from })
    )
  )
  console.log('messages', messages)
})()
