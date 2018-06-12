import React, { Component } from 'react';

class RetirementComputation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      data: nextProps.data
    }
  }

  render() {
    // find the first year with `canRetire` being true
    var canRetire = -1;
    for (var entry in this.state.data) {
      if (this.state.data[entry]['canRetire'] === true) {
        canRetire = entry.year;
        break;
      }
    }


    return <div><pre>{canRetire === -1 ? <span>You will never retire!</span> : <span>You will retire in X years!!</span>}</pre></div>

  }
}

export default RetirementComputation;