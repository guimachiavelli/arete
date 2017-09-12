import React from 'react';
import PropTypes from 'prop-types';

class Action extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onAction(
      this.props.consequences,
    );
  }

  render() {
    return (
      <button className="stage" onClick={this.handleClick}>
        {this.props.title}
      </button>
    );
  }
}

Action.propTypes = {
  onAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  goTo: PropTypes.string,
  effect: PropTypes.shape({
    attr: PropTypes.string.isRequired,
    modifier: PropTypes.number.isRequired,
  }),
};

export default Action;
