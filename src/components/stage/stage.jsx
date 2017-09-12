import React from 'react';
import PropTypes from 'prop-types';

import Action from './action';
import TextBox from './textbox';

class Stage extends React.Component {
  render() {
    let actions = [];

    if (this.props.actions) {
      actions = this.props.actions.map(action =>
        (<Action
          title={action.name}
          consequences={action.consequences}
          onAction={this.props.onAction}
          key={action.name}
        />),
      );
    }

    return (
      <div className="stage">
        <h1>{this.props.title}</h1>
        <TextBox>{this.props.text}</TextBox>
        <div className="actions">
          {actions}
        </div>
      </div>
    );
  }
}

Stage.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    effect: PropTypes.object,
    goTo: PropTypes.string,
    onAction: PropTypes.func,
  })),
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAction: PropTypes.func.isRequired,
};

export default Stage;
