import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

const nervos = require('./nervos')
const simpleStore = require('./simpleStore')

class App extends Component {
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
