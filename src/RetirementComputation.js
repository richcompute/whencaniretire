import React, { Component } from 'react';

class RetirementComputation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
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
      if (this.state.data[entry].canRetire) {
        canRetire = this.state.data[entry].year + 1;
        break;
      }
    }

    console.log(canRetire);

    let userMessage;
    if (canRetire === -1) {
      userMessage = <span>Vous ne pourrez jamais vous retirer!</span>
    } else {
      userMessage = <span><h2>Vous allez vous retirer dans {canRetire} années!</h2></span>
    }

    return <div><pre>{userMessage}</pre></div>

  }
}

export default RetirementComputation;