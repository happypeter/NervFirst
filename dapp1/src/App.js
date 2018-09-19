import React, { Component } from 'react'
import './App.css'

const nervos = require('./nervos')
const simpleStore = require('./simpleStore')

class App extends Component {
  state = {
    msg: ''
  }
  handleChange = e => {
    this.setState({
      msg: e.target.value
    })
  }
  handleSubmit = async e => {
    e.preventDefault()
    const { msg } = this.state
    const time = new Date()

    const current = await nervos.appchain.getBlockNumber()
    const tx = {
      ...simpleStore.transaction,
      validUntilBlock: +current + 88
    }
    const res = await simpleStore.simpleStoreContract.methods
      .add(msg, +time)
      .send(tx)

    const receipt = await nervos.listeners.listenToTransactionReceipt(res.hash)
    receipt.errorMessage && console.log(receipt.errorMessage)
    this.setState({
      msg: ''
    })
  }

  componentDidMount = async () => {
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
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.msg}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default App
