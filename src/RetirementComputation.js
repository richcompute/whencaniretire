import React, { Component } from 'react';

class RetirementComputation extends Component {
  constructor(props) {
    super(props)
//    this.state = {
//      data: this.props.data
//    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      data: nextProps.data
    }
  }

  render() {
    // find the first year with `canRetire` being true
    let canRetire = -1;
    for (let entry in this.state.data) {
      if (this.state.data[entry].canRetire === true) {
        canRetire = this.state.data[entry].year;
        break;
      }
    }

    let userMessage;
    if (canRetire === -1) {
      userMessage = <span>You will never retire!</span>
    } else {
      userMessage = <span>You will retire in {canRetire} years</span>
    }

    console.log(userMessage)
    return <div><pre>{userMessage}</pre></div>

  }
}

export default RetirementComputation;