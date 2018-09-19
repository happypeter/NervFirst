const nervos = require('./nervos')
const { contractAddress } = require('./config')

const abi = [
  {
    constant: false,
    inputs: [
      {
        name: 'text',
        type: 'string'
      },
      {
        name: 'time',
        type: 'uint256'
      }
    ],
    name: 'add',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getList',
    outputs: [
      {
        name: '',
        type: 'uint256[]'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'time',
        type: 'uint256'
      }
    ],
    name: 'get',
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: '_sender',
        type: 'address'
      },
      {
        indexed: true,
        name: '_text',
        type: 'string'
      },
      {
        indexed: true,
        name: '_time',
        type: 'uint256'
      }
    ],
    name: 'Recorded',
    type: 'event'
  }
]

const transaction = require('./transaction')
const simpleStoreContract = new nervos.appchain.Contract(abi, contractAddress)
module.exports = {
  transaction,
  simpleStoreContract
}
