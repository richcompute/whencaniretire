import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RetirementComputation from './RetirementComputation.js';
import ProgressTable from './ProgressTable.js';
import SavingRate from './SavingRate.js';

const WithdrawalRate = 0.04;

class App extends Component {
  constructor(props) {
    super(props)
    this.postTaxIncome = 100000;
    this.currentExpense = 45000;
    this.retirementExpense = 40000;
    this.currentNetworth = 0;
    this.interestRate = 0.05;
    this.updateRetirementNetworthGoal();

    this.state = {
      postTaxIncome: this.postTaxIncome,
      currentExpense: this.currentExpense,
      retirementExpense: this.retirementExpense,
      currentNetworth: this.currentNetworth,
      worksheet: [
        {
          year: 0,
          startingNetworth: 0,
          investment: 0,
          interest: 0,
          endingNetworth: 0,
          canRetire: false
        }
      ]
    }
    this.state.worksheet = this.computeWorksheetData()
  }

  computeWorksheetData() {
    let worksheetData = [];

    let endingNetworth = this.currentNetworth;
    for (var i = 0; i < 100; i++) {
      var entry = {};
      entry['year'] = i;
      let startingNetworth = endingNetworth;
      entry['startingNetworth'] = endingNetworth.toFixed(2);
      entry['investment'] = this.postTaxIncome - this.currentExpense;
      let interest = (startingNetworth + entry['investment'] / 2) * this.interestRate;
      entry['interest'] = interest.toFixed(2);
      endingNetworth = startingNetworth + entry['investment'] + interest;
      entry['endingNetworth'] = endingNetworth.toFixed(2);
      let canRetire = (endingNetworth >= this.retirementNetworthGoal);
      entry['canRetire'] = canRetire;
      worksheetData.push(entry);
      if (canRetire) {
        break;
      }
    }

    return worksheetData
  }

  updateFullState() {
    this.setState({worksheet: this.computeWorksheetData()});
  }

  updateRetirementNetworthGoal() {
    this.retirementNetworthGoal = this.retirementExpense / WithdrawalRate;
  }

  handleChange(e, name) {
    this[name] = parseInt(e.target.value);
    this.setState({[name]: parseInt(e.target.value)})

    if (name === 'retirementExpense') {
      this.updateRetirementNetworthGoal();
    }

    this.updateFullState();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">When Can I Retire?</h1>
        </header>
        <div className="App-intro">
          Enter the information requested to figure out your retirement date
        </div>
        <form>
          <p>
            <label>Your Take Home Pay</label>
            <input type="text" type="number" name="postTaxIncome" value={this.state.postTaxIncome} onChange={ (e) => this.handleChange(e, 'postTaxIncome') } />
          </p>
          <p>
            <label>Your Current Expense</label>
            <input type="text" type="number" name="currentExpense" value={this.state.currentExpense} onChange={ (e) => this.handleChange(e, 'currentExpense') } />
          </p>
          <p>
            <label>Your Retirement Expense</label>
            <input type="text" type="number" name="retirementExpense" value={this.state.retirementExpense} onChange={ (e) => this.handleChange(e, 'retirementExpense') } />
          </p>
          <p>
            <label>Current Net Worth</label>
            <input type="text" type="number" name="currentNetworth" value={this.state.currentNetworth} onChange={ (e) => this.handleChange(e, 'currentNetworth') } />
          </p>
          </form>
        <SavingRate income={this.state.postTaxIncome} expense={this.state.currentExpense}/>
        <RetirementComputation data={this.state.worksheet}/>
        <ProgressTable data={this.state.worksheet}/>
      </div>
    );
  }
}

export default App;
