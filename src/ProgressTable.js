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

      return < ReactTable
        data = { data }
        columns = { columns }
        showPagination = {false}
        minRows = {0}
        sortable = { false }
      />
  }
}

export default ProgressTable;