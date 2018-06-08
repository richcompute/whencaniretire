import React, { Component } from 'react';

class SavingRate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      postTaxIncome: this.props.income,
      currentExpense: this.props.expense
    }
  }

  componentDidMount() {
  this.setState({
    postTaxIncome: this.props.income,
    currentExpense: this.props.expense
  });
}
  render() {
    return (this.state.postTaxIncome - this.state.currentExpense) / (this.state.postTaxIncome) * 100 + '%'
  }
}

export default SavingRate;