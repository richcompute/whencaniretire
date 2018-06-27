import React, { Component } from 'react';

class SavingRate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      postTaxIncome: parseInt(this.props.income, 10),
      currentExpense: parseInt(this.props.expense, 10)
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
    postTaxIncome: parseInt(nextProps.income, 10),
    currentExpense: parseInt(nextProps.expense, 10)
      }
  }

  render() {
    let isValidSavingRate = (this.state.postTaxIncome >= this.state.currentExpense);

    let userMessage;
    if (isValidSavingRate) {
      userMessage = <span><h2>Your saving rate: {(Math.round((this.state.postTaxIncome - this.state.currentExpense) / (this.state.postTaxIncome) * 100) + '%')}</h2></span>
    } else {
      userMessage = <span><h2>Invalid Saving Rate</h2></span>
    }

    return <div><pre>{userMessage}</pre></div>
  }
}

export default SavingRate;