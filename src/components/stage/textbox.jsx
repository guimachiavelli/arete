import React from 'react';
import PropTypes from 'prop-types';

class TextBox extends React.Component {
  render() {
    const paragraphs = this.props.children.map(child =>
      (
        <p key={child.slice(0, 20).replace(/\s+/g, '-')}>{child}</p>
      ),
    );

    return (
      <div className="textbox">
        {paragraphs}
      </div>
    );
  }
}

TextBox.propTypes = {
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TextBox;
