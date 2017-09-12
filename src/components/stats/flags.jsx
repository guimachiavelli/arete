import React from 'react';
import PropTypes from 'prop-types';

class Flags extends React.Component {
  render() {
    const flags = this.props.data.map(flag =>
      (
        <li className="flag" key={flag.slice(0, 10)}>
          {flag}
        </li>
      ),
    );

    return (
      <div className="flags">
        <h5>Flags</h5>
        <ul className="flag__list">
          {flags}
        </ul>
      </div>
    );
  }
}

export default Flags;
