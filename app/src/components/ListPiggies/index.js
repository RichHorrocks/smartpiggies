import React, { Component } from "react"
import { drizzleConnect } from "drizzle-react"

import PropTypes from 'prop-types'

/* import components */
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class ListPiggies extends Component {
  constructor(props, context) {
    super(props)

    this.handleButton = this.handleButton.bind(this)
    this.state = {
      piggy: ''
    }
  }

  handleButton(event) {
    // this.setState({
    //   selectedPiggy: this.props.piggyId,
    // })
    // super.setState({
    //   selectedPiggy: this.props.piggyId,
    // })
    console.log(this.props.piggyId)
  }

  render() {

    return (
      <div>
      <ListItem button key={this.props.key} piggyId={this.props.piggyId} onClick={this.handleButton}>
        <ListItemText>
          {this.props.piggyIndex}
        </ListItemText>
          {this.props.piggyId}
      </ListItem>
      {/*
      {this.props.piggyList.map(item => (
        <ListItem button key={item.label} value={item.value} onClick={this.handleButton}>
          <ListItemText>
            {item.label}
          </ListItemText>
            {item.value}
        </ListItem>
      ))}
      */}
        </div>
    )
  }
}

ListPiggies.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SmartPiggies: state.contracts.SmartPiggies,
    TableTokens: state.contracts.TableTokens,
    StableLink: state.contracts.StableLink,
    drizzleStatus: state.drizzleStatus,
  };
};

export default drizzleConnect(ListPiggies, mapStateToProps);