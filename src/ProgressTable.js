import React, { Component } from 'react';

class ProgressTable extends Component {
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
    return isValidSavingRate ? (Math.round((this.state.postTaxIncome - this.state.currentExpense) / (this.state.postTaxIncome) * 100) + '%') : "Invalid Saving Rate";
  }
}

export default ProgressTable;