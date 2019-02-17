import React, { Component } from "react"
import { drizzleConnect } from "drizzle-react"

import PropTypes from 'prop-types'

/* import components */
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PiggyDetail from '../PiggyDetail'

import ERC20Stats from '../ERC20Stats';  // try to render this at the top of the left sidebar
//import { Typography } from "@material-ui/core";

/*
background
width
height
padding
border
margin
textAlign
display
*/
const appBar = {
  backgroundColor: 'default',
  height: 50,
  display: 'block',
  padding: 10,
};

const leftPane = {
  backgroundColor: '#FFCBCB',
  //height: 500,
  width: 250,
  margin: "1em",
  textAlign: 'left',
  display: 'block',
  padding: 10,
  marginTop: '5em'
};

const main = {
  backgroundColor: '#FFCBCB',
  height: '60em', // COMMENT THIS OUT LATER WHEN THERE IS CONTENT TO PUT IN
  width: '50em',
  margin: '1em',
  textAlign: 'center',
  display: 'block',
  padding: 10,
  marginTop: '5em'
};

const grid = {
  flexGrow: 1,
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: 20,
  }
}

class Home extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts
    this.drizzle = context.drizzle

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleSelectPiggy = this.handleSelectPiggy.bind(this)
    this.groomAddress = this.groomAddress.bind(this)

    this.state = {
      spContractAddress: '',
      activeAccount: '',
      open: true,
      selectedPiggy: '',
      piggyOnAuction: false, // PLACEHOLDER FOR TESTING - FETCH LATER

      // visibility state management
      // easiest way to handle these is if you have event handlers for clicks that set all to false except the ones that should be true
      showDefaultPage: true,  // should be true on initial load, and if we ever get redirected back here after a special action
      showPiggyDetails: false, // PLACEHOLDER FOR TESTING - DEFAULT SHOULD PROBABLY BE FALSE
      //showAuctionDetails: false, // PLACEHOLDER FOR TESTING - DEFAULT SHOULD PROBABLY BE FALSE
      //showAdminArea: false,  // PLACEHOLDER FOR TESTING - DEFAULT SHOULD PROBABLY BE FALSE
    }
  }

  componentDidMount() {
    /*
    this.contracts.StableToken.methods.balanceOf(
      this.props.accounts[0]
    )
    .call({from: this.props.accounts[0]})
    .then(result => {
      console.log(result.toString())
    })
    */
    const dataKeyGetOwnedPiggies = this.contracts.SmartPiggies.methods['getOwnedPiggies'].cacheCall(this.props.accounts[0])
    this.setState({
      spContractAddress: this.contracts.SmartPiggies.address,
      activeAccount: this.props.accounts[0]
    })
  }

  groomAddress(address) {
    let groomed
    if (address !== '0x0000000000000000000000000000000000000000') {
      groomed = address.slice(0, 6)
      groomed = groomed + "...." + address.slice(-4)
    }
    return groomed
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleSelectPiggy = name => () => {
    this.setState({
      piggyId: name,
      showPiggyDetails: true,
      showDefaultPage: false,

    })
  }

  render() {
    let groomedAddress = this.groomAddress(this.state.activeAccount)
    //console.log(this.state.piggyId)
    let piggies = spArray.map(item =>
      <ListItem button key={item.label} value={item.value} onClick={this.handleSelectPiggy(item.value)}>
        <ListItemText>
          {item.label}
        </ListItemText>
        {item.value}
      </ListItem>)
    return (
      <div>
        <AppBar
          style={appBar}
          color="default"
        >
          <table>
            <tbody>
              <tr>
                <td>Contract:</td>
                <td></td>
                <td>{this.state.spContractAddress}</td>
              </tr>
            </tbody>
          </table>
        </AppBar>

        <Grid container style={grid}>
          <Grid item>
            <Grid container>
              <Paper style={leftPane}>

                {/**  Account + piggy information */}
                <List>

                  <ListItem>
                    <Typography variant="h6">Account:</Typography>
                    {groomedAddress}
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText>
                      <h3>Piggies:</h3>
                    </ListItemText>
                  </ListItem>

                  {piggies}

                </List>
                {/**  ERC-20 information */}
                <ERC20Stats />

              </Paper>
            </Grid>
          </Grid>
          <Divider light />
          <Grid item>
            <Grid container>
              <Paper style={main}>
                {/** Default Screen "component" - should show if all "component state management" bools are false*/}

                {this.state.showDefaultPage &&

                  <div>
                    Load a happy pig picture
                    also a button inviting the user to create a new piggy
                  </div>
                }

                {/** Create Piggy "component" - should show if a "Create Piggy" button has been clicked on in the list above, or default screen*/}

                {/** Piggy Details "component" - should show if a piggy has been clicked on in the list above*/}
                {this.state.showPiggyDetails &&
                  <div>
                    Current Piggy: {this.state.piggyId}
                    <div>
                      <ExpansionPanel defaultExpanded={true}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="h5">Core Piggy Details</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <PiggyDetail />
                        <List>
                          pull in the various detail fields here as list items
                          <ListItem>
                            Collateral Contract address: 0x000...
                          </ListItem>
                          <ListItem>
                            Payments ERC-20 Contract address: 0x000...
                          </ListItem>
                          <ListItem>
                            Resolver address: 0x000...
                          </ListItem>
                          <ListItem>
                            etc.
                          </ListItem>
                          <ListItem>
                            etc.
                          </ListItem>
                        </List>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </div>
                    <div>
                      <Divider />
                      <ExpansionPanel defaultExpanded={this.state.piggyOnAuction}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="h5">Piggy Auction Management</Typography>
                        </ExpansionPanelSummary>
                        {this.state.piggyOnAuction &&
                          <ExpansionPanelDetails>
                            <List>
                              pull in the various auction detail fields here as list items
                              <ListItem>
                                On auction: {this.state.piggyOnAuction}
                              </ListItem>
                              <ListItem>
                                Start block: 654321
                              </ListItem>
                              <ListItem>
                                Expiry block: 655000
                              </ListItem>
                              <ListItem>
                                etc.
                              </ListItem>
                              <ListItem>
                                etc.
                              </ListItem>
                            </List>
                          </ExpansionPanelDetails>
                        }
                        {!this.state.piggyOnAuction &&
                          <ExpansionPanelDetails>
                            Form goes here for auction start
                            Button at bottom to "Start Auction" or "cancel" (which clears input fields)
                          </ExpansionPanelDetails>
                        }
                      </ExpansionPanel>
                    </div>
                  </div>}

              </Paper>
            </Grid>
          </Grid>
        </Grid>


      </div>
    )
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SmartPiggies: state.contracts.SmartPiggies,
    StableToken: state.contracts.StableToken,
    RopstenLINK: state.contracts.RopstenLINK,
    drizzleStatus: state.drizzleStatus,
  };
};

export default drizzleConnect(Home, mapStateToProps);
