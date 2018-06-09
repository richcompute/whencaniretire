import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SavingRate from './SavingRate.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state =  { postTaxIncome : 100000,
                    currentExpense : 45000,
                    retirementExpense: 40000,
                    currentNetworth: 0,
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

  handleChange(e, name) {
    this.setState({[name]: e.target.value})
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
          Your Take Home Pay <input type="text" name="postTaxIncome" value={this.state.postTaxIncome} onChange={ (e) => this.handleChange(e, 'postTaxIncome') } />
        </p>
        <p>
          Your Current Expense <input type="text" name="currentExpense" value={this.state.currentExpense} onChange={ (e) => this.handleChange(e, 'currentExpense') } />
        </p>
        <p>
          Your Retirement Expense <input type="text" name="retirementExpense" value={this.state.retirementExpense} onChange={ (e) => this.handleChange(e, 'retirementExpense') } />
        </p>
        <p>
          Your Current Net Worth <input type="text" name="currentNetworth" value={this.state.currentNetworth} onChange={ (e) => this.handleChange(e, 'currentNetworth') } />
        </p>
        <SavingRate income={this.state.postTaxIncome} expense={this.state.currentExpense}/>
      </div>
    );
  }
}

export default App;
