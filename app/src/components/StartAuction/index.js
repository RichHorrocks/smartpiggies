import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import web3 from 'web3'


import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'

//import GetStats from '../../Layout/GetStats'
//import AccountAddress from '../Displays/AccountAddress'
//import TokenBalance from '../Displays/TokenBalance'
//import GetBlockNumber from '../GetBlockNumber'

const BN = web3.utils.BN

const amounts = [
  {
    value: '1000000000000000000',
    label: '1x10^18',
  },
  {
    value: '10000000000000000000',
    label: '10x10^18',
  },
  {
    value: '100000000000000000000',
    label: '100x10^18',
  },
]

class StartAuction extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    this.handleTextMenuChange = this.handleTextMenuChange.bind(this)
    this.handleStartButton = this.handleStartButton.bind(this)

    this.state = {
      accountAddress: '0x0000000000000000000000000000000000000000',
      piggyId: '0',
      startPrice: '',
      reservePrice: '',
      auctionLength: '',
      timeStep: '',
      priceStep: '',
    }
  }

  componentDidMount() {
    this.setState({
      accountAddress: this.props.accounts[0]
    })
  }

  handleTextInputChange(event) {
        this.setState({ [event.target.name]: event.target.value })
  }

  handleTextMenuChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  handleCheckedInputChange = name => event => {
    this.setState({ [name]: event.target.checked })
  }

  handleInputChange(event) {
    if (event.target.value.match(/^[0-9]{1,40}$/)) {
      var amount = new BN(event.target.value)
      if (amount.gte(0)) {
        this.setState({ [event.target.name]: amount.toString() })
        //this.setTXParamValue(amount)
      } else {
        this.setState({ [event.target.name]: '' })
        //this.setTXParamValue(0)
      }
    } else {
        this.setState({ [event.target.name]: '' })
        //this.setTXParamValue(0)
      }
  }

  setTXParamValue(_value) {
    if (web3.utils.isBN(_value)) {
      this.setState({
        detail: _value.toString()
      })
    } else {
      this.setState({
        detail: ''
      })
    }
  }

  handleStartButton() {
    let stackId = this.contracts.SmartPiggies.methods.startAuction
    .cacheSend(
      this.state.piggyId,
      this.state.startPrice,
      this.state.reservePrice,
      this.state.auctionLength,
      this.state.timeStep,
      this.state.priceStep,
      {from: this.state.accountAddress, gas: 500000, gasPrice: 1100000000})
      console.log(this.props.transactionStack[stackId])
  }

  render() {

    return (
      <div className="App">
      <Paper>
        {/*<AccountAddress accounts={this.props.accounts}  account={this.state.accountAddress} />*/}
        {/*<TokenBalance owner={this.state.accountAddress} token={this.state.tokenAddress} />*/}
      </Paper>
      <Paper>
        <table>
          <tbody>
          <tr>
            <td>Token ID:</td>
            <td>
              <TextField
                id="piggyId"
                label="piggyId"
                value={this.state.piggyId}
                onChange={this.handleTextMenuChange('piggyId')}
                margin="normal"
                variant="filled"
              />
            </td>
          </tr>
            <tr>
            <td></td>
            <td>
              <TextField
                id="denomination"
                select
                label="denomination"
                value={this.state.startPrice}
                onChange={this.handleTextMenuChange('startPrice')}
                helperText="select a denomination"
                margin="normal"
                variant="filled"
                >
                {amounts.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                  {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </td>
            </tr>
            <tr>
              <td>Start Amount:</td>
              <td>
                <TextField
                  id="startPrice"
                  label="Starting Price"
                  value={this.state.startPrice}
                  onChange={this.handleTextMenuChange('startPrice')}
                  margin="normal"
                  variant="filled"
                />
              </td>
            </tr>
            <tr>
              <td>Reserve Amount:</td>
              <td>
                <TextField
                  id="reservePrice"
                  label="Reserve"
                  value={this.state.reservePrice}
                  onChange={this.handleTextMenuChange('reservePrice')}
                  margin="normal"
                  variant="filled"
                />
              </td>
            </tr>
            <tr>
              <td>Auction Duration:</td>
              <td>
                <TextField
                  id="auctionLength"
                  label="Blocks"
                  value={this.state.auctionLength}
                  onChange={this.handleTextMenuChange('auctionLength')}
                  margin="normal"
                  variant="filled"
                />
              </td>
            </tr>
            <tr>
              <td>Time Step:</td>
              <td>
                <TextField
                  id="timeStep"
                  label="Blocks"
                  value={this.state.timeStep}
                  onChange={this.handleTextMenuChange('timeStep')}
                  margin="normal"
                  variant="filled"
                />
              </td>
            </tr>
            {/*
            <tr>
              <td>Current Block:</td>
              <td><GetBlockNumber /></td>
            </tr>
            */}
            <tr height="10em"></tr>
            <tr>
              <td>Price Step:</td>
              <td>
                <TextField
                  id="priceStep"
                  label="Interval Value"
                  value={this.state.priceStep}
                  onChange={this.handleTextMenuChange('priceStep')}
                  margin="normal"
                  variant="filled"
                />
              </td>
            </tr>

          </tbody>
        </table>
        <table align="center">
          <tbody>
            <tr height="10em"></tr>
            <tr>
              <td>
                <Button type="Button" variant="contained" onClick={this.handleStartButton}>Start</Button>
              </td>
              <td width="20em" ></td>
              <td>
                {/*<GetStats />*/}
              </td>
            </tr>
            <tr height="10em"></tr>
          </tbody>
        </table>
        </Paper>
      </div>
    )
  }
}

StartAuction.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SmartPiggies: state.contracts.SmartPiggies,
    StableToken: state.contracts.StableToken,
    RopstenLINK: state.contracts.RopstenLINK,
    drizzleStatus: state.drizzleStatus,
    transactionStack: state.transactionStack,
    transactions: state.transactions
  }
}

export default drizzleConnect(StartAuction, mapStateToProps)