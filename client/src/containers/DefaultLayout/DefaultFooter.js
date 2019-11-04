import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="http://icechewing.com/">IceChewing</a> &copy; 2019 JORLTD</span>
        <span className="ml-auto">Powered by <a href="https://duckduckgo.com/?q=spaghetti+image+search&t=canonical&atb=v184-1&ia=images&iax=images">Ashé</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
