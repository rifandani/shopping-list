import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../..//actions/authActions';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  render() {
    return (
      <>
        <NavLink onClick={this.props.logout} href="#">
          Logout
        </NavLink>
      </>
    );
  }
}

export default connect(null, { logout })(Logout);
