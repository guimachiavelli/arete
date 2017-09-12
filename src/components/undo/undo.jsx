import React from 'react';
import PropTypes from 'prop-types';

class UndoButton extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onUndo();
  }

  render() {
    return (
      <button onClick={this.handleClick}>Undo</button>
    );
  }
}

export default UndoButton;
