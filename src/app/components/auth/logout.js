import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Logout extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    props.cookies.remove('user');
  }

  render() {
    const { cookies } = this.props;
    if (cookies.get('user') === 'demo') {
      return <Redirect to="/dashboard" />;
    }
    return <Redirect to="/" />;
  }
}
export default withCookies(Logout);
