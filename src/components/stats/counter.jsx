import React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component {
  render() {
    let text;

    text = `${this.props.current}`;

    text = Array(this.props.current).join('░');

    return (
      <div className="stats__counter">
        <p>{this.props.title}</p>
        <p className="stats__value">{text}</p>
      </div>
    );
  }
}

Counter.propTypes = {
  title: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
};

Counter.defaultProps = {
  max: null,
};

export default Counter;
