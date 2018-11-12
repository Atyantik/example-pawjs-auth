import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';

class Auth extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  render() {
    const { cookies, children } = this.props;
    if (cookies.get('user') === 'demo') {
      return children;
    }
    return <Redirect to="/login" />;
  }
}
export default withCookies(Auth);
