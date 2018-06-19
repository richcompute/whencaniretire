import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class ProgressTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : props.data
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      data: nextProps.data
    }
  }

  render() {
    console.log(this.state.data);
    /*
    const data = [{
      name: 'Tanner Linsley',
      age: 26,
      friend: {
        name: 'Jason Maurer',
        age: 23,
      }
    }
    ];*/

    const data = this.state.data;

    const columns = [{
        Header: 'Year',
        accessor: 'year' // String-based value accessors!
      }, {
      Header: 'Start',
      accessor: 'startingNetworth',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      },
      {
        Header: 'Investment',
        accessor: 'investment'
      },
      {
        Header: 'Interest',
        accessor: 'interest'
      },
      {
        Header: 'End',
        accessor:  'endingNetworth'
      }
    ];

      /*
      year: 0,
      startingNetworth: 0,
      investment: 0,
      interest: 0,
      endingNetworth: 0,
      canRetire: false
      */

      return < ReactTable
        data = { data }
        columns = { columns }
      />
  }
}

export default ProgressTable;