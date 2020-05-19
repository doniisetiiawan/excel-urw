// eslint-disable-next-line max-len
/* eslint-disable jsx-a11y/click-events-have-key-events,react/no-access-state-in-setstate,jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Excel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.initialData,
      sortby: null,
      descending: false,
    };
  }

  _sort = (e) => {
    const column = e.target.cellIndex;
    const data = this.state.data.slice();
    const descending = this.state.sortby === column
      && !this.state.descending;
    data.sort((a, b) => (descending
      ? a[column] < b[column]
        ? 1
        : -1
      : a[column] > b[column]
        ? 1
        : -1));
    this.setState({
      data,
      sortby: column,
      descending,
    });
  };

  render() {
    return (
      <div>
        <table>
          <thead onClick={this._sort}>
            <tr>
              {this.props.headers.map((title, idx) => {
                if (this.state.sortby === idx) {
                  title += this.state.descending ? ' \u2191' : ' \u2193';
                }
                return <th key={title}>{title}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((row) => (
              <tr key={row[3]}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Excel;

Excel.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialData: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string),
  ).isRequired,
};
