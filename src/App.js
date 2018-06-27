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
    this.interestRate = 5;
    this.updateRetirementNetworthGoal();

    this.state = {
      postTaxIncome: this.postTaxIncome,
      currentExpense: this.currentExpense,
      retirementExpense: this.retirementExpense,
      currentNetworth: this.currentNetworth,
      interestRate: this.interestRate,
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
      entry['year'] = i + 1;
      let startingNetworth = endingNetworth;
      entry['startingNetworth'] = endingNetworth.toFixed(2);
      entry['investment'] = this.postTaxIncome - this.currentExpense;
      let interest = (startingNetworth + entry['investment'] / 2) * this.interestRate / 100.0;
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
          <h1 className="App-title">Quand puis-je me retirer?</h1>
        </header>
        <div className="App-intro">
          Entrez l'information demandée pour obtenir votre date de retraite
        </div>
        <form>
          <p>
            <label>Vos revenus, après impôt</label>
            <input type="text" type="number" name="postTaxIncome" value={this.state.postTaxIncome} onChange={ (e) => this.handleChange(e, 'postTaxIncome') } />
          </p>
          <p>
            <label>Vos dépenses</label>
            <input type="text" type="number" name="currentExpense" value={this.state.currentExpense} onChange={ (e) => this.handleChange(e, 'currentExpense') } />
          </p>
          <p>
            <label>Vos dépenses à la retraite</label>
            <input type="text" type="number" name="retirementExpense" value={this.state.retirementExpense} onChange={ (e) => this.handleChange(e, 'retirementExpense') } />
          </p>
          <p>
            <label>Votre valeur nette</label>
            <input type="text" type="number" name="currentNetworth" value={this.state.currentNetworth} onChange={ (e) => this.handleChange(e, 'currentNetworth') } />
          </p>
          <p>
            <label>Retour sur l'investissement</label>
            <input type="text" type="number" name="interestRate" value={this.state.interestRate} onChange={ (e) => this.handleChange(e, 'interestRate') } />
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
