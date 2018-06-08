import React, { Component } from 'react';

class SavingRate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      postTaxIncome: this.props.income,
      currentExpense: this.props.expense
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
    postTaxIncome: nextProps.income,
    currentExpense: nextProps.expense
      }
  }

  render() {
    const isValidSavingRate = this.state.postTaxIncome >= this.state.currentExpense;
    return isValidSavingRate ? (Math.round((this.state.postTaxIncome - this.state.currentExpense) / (this.state.postTaxIncome) * 100) + '%') : "Invalid Saving Rate";
  }
}

export default SavingRate;