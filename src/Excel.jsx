import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Excel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.initialData,
    };
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              {this.props.headers.map((title) => (
                <th key={title}>{title}</th>
              ))}
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
