const nervos = require('./nervos')
const { abi, bytecode } = require('./compiled.js')

const transaction = require('./transaction')
const myContract = new nervos.appchain.Contract(abi)
;(async function() {
  const current = await nervos.appchain.getBlockNumber()
  transaction.validUntilBlock = current + 88
  const txRes = await myContract
    .deploy({ data: bytecode, arguments: [] })
    .send(transaction)
  const res = await nervos.listeners.listenToTransactionReceipt(txRes.hash)
  const { contractAddress } = res
  console.log('contractAddress', contractAddress)
  await nervos.appchain.storeAbi(contractAddress, abi, transaction) // store abi on the chain
  nervos.appchain.getAbi(contractAddress).then(console.log) // get abi from the chain
})()
