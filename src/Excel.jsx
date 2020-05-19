import React from 'react';
import PropTypes from 'prop-types';

export default function Excel(props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {props.headers.map((title) => (
              <th key={title}>{title}</th>
            ))}
          </tr>
        </thead>
      </table>
    </div>
  );
}

Excel.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};
