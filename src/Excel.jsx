// eslint-disable-next-line max-len
/* eslint-disable jsx-a11y/click-events-have-key-events,react/no-access-state-in-setstate,jsx-a11y/no-noninteractive-element-interactions,no-nested-ternary,react/no-array-index-key,jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Excel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null,
      search: false,
    };
    this._preSearchData = null;
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

  _showEditor = (e) => {
    this.setState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex,
      },
    });
  };

  _save = (e) => {
    e.preventDefault();
    const input = e.target.firstChild;
    const data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.setState({
      edit: null,
      data,
    });
  };

  _renderTable = () => (
    <table>
      <thead onClick={this._sort}>
        <tr>
          {this.props.headers.map((title, idx) => {
            if (this.state.sortby === idx) {
              title += this.state.descending
                ? ' \u2191'
                : ' \u2193';
            }
            return <th key={title}>{title}</th>;
          })}
        </tr>
      </thead>
      <tbody onDoubleClick={this._showEditor}>
        {this._renderSearch()}
        {this.state.data.map((row, rowidx) => (
          <tr key={rowidx}>
            {row.map((cell, idx) => {
              let content = cell;
              const { edit } = this.state;

              if (
                edit
                && edit.row === rowidx
                && edit.cell === idx
              ) {
                content = (
                  <form onSubmit={this._save}>
                    <input
                      type="text"
                      name="name"
                      defaultValue={cell}
                    />
                  </form>
                );
              }

              return (
                <td key={idx} data-row={rowidx}>
                  {content}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );

  _renderToolbar = () => (
    <button
      type="button"
      onClick={this._toggleSearch}
      className="toolbar"
    >
      search
    </button>
  );

  _toggleSearch = () => {
    if (this.state.search) {
      this.setState({
        data: this._preSearchData,
        search: false,
      });
      this._preSearchData = null;
    } else {
      this._preSearchData = this.state.data;
      this.setState({
        search: true,
      });
    }
  };

  _renderSearch = () => {
    if (!this.state.search) {
      return null;
    }
    return (
      <tr onChange={this._search}>
        {this.props.headers.map((_ignore, idx) => (
          <td key={idx}>
            <input type="text" data-idx={idx} />
          </td>
        ))}
      </tr>
    );
  };

  _search = (e) => {
    const needle = e.target.value.toLowerCase();
    if (!needle) {
      this.setState({ data: this._preSearchData });
    }
    const { idx } = e.target.dataset;
    const searchdata = this._preSearchData.filter(
      (row) => row[idx].toString().toLowerCase().indexOf(needle)
        > -1,
    );
    this.setState({ data: searchdata });
  };

  render() {
    return (
      <div>
        {this._renderToolbar()}
        {this._renderTable()}
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
