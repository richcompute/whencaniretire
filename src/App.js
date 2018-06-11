import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SavingRate from './SavingRate.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.postTaxIncome = 100000;
    this.currentExpense = 45000;
    this.retirementExpense = 40000;
    this.currentNetworth = 0;
    this.interestRate = 0.05;

    this.state =  { postTaxIncome : this.postTaxIncome,
                    currentExpense : this.currentExpense,
                    retirementExpense: this.retirementExpense,
                    currentNetworth: this.currentNetworth,
                    worksheet : [
                      {
                        year: 0,
                        startingNetworth : 0,
                        investment : 0,
                        interest : 0,
                        endingNetworth : 0,
                        canRetire : false
                      }
                    ]
                  }
  }

  updateFullState() {
    var worksheetData = [];

    var endingNetworth = this.currentNetworth;
    for (var i = 0; i < 100; i++) {
      var entry = {};
      entry['year'] = i;
      entry['startingNetworth'] = endingNetworth;
      entry['investment'] = this.postTaxIncome - this.currentExpense;
      entry['interest]'] = (entry['startingNetworth'] + entry['investment'] / 2) * this.interestRate;
      endingNetworth = entry['startingNetworth'] + entry['investment'] + entry['interest'];
      entry['endingNetworth'] = endingNetworth;
      worksheetData.push(entry);
    }

    this.setState({worksheet: worksheetData});
  }

  handleChange(e, name) {
    this[name] = e.target.value;
    this.setState({[name]: e.target.value})
    this.updateFullState();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">When Can I Retire?</h1>
        </header>
        <p className="App-intro">
          Enter the information requested to figure out your retirement date
        </p>
        <p>
          Your Take Home Pay <input type="text" type="number" name="postTaxIncome" value={this.state.postTaxIncome} onChange={ (e) => this.handleChange(e, 'postTaxIncome') } />
        </p>
        <p>
          Your Current Expense <input type="text" type="number" name="currentExpense" value={this.state.currentExpense} onChange={ (e) => this.handleChange(e, 'currentExpense') } />
        </p>
        <p>
          Your Retirement Expense <input type="text" type="number" name="retirementExpense" value={this.state.retirementExpense} onChange={ (e) => this.handleChange(e, 'retirementExpense') } />
        </p>
        <p>
          Your Current Net Worth <input type="text" type="number" name="currentNetworth" value={this.state.currentNetworth} onChange={ (e) => this.handleChange(e, 'currentNetworth') } />
        </p>
        <SavingRate income={this.state.postTaxIncome} expense={this.state.currentExpense}/>
      </div>
    );
  }
}

export default App;
