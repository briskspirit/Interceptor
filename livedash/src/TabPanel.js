import React, { Component } from 'react';
import propTypes from 'prop-types';


export class TabPanel extends Component {
  render() {
    //console.log("Rendering TabPanel");
    return (
      <div
        role="tabpanel"
        hidden={this.props.value !== this.props.index}
        id={`plugin-tabpanel-${this.props.index}`}
        aria-labelledby={`plugin-tab-${this.props.index}`}
        {...this.props}
      >
        {this.props.children}
        {/* {this.props.value === this.props.index && this.props.children} //Disconnects component on div hide  */}
      </div>
    )
  }
}

TabPanel.propTypes = {
  children: propTypes.node,
  index: propTypes.any.isRequired,
  value: propTypes.any.isRequired,
};