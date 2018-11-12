import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Header extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu() {
    const { isMenuOpen } = this.state;
    this.setState({ isMenuOpen: !isMenuOpen });
  }

  render() {
    const { cookies } = this.props;
    const { isMenuOpen } = this.state;
    const isLoggedIn = cookies.get('user') === 'demo';
    return (
      <div className="hero-head">
        <nav className="navbar is-info">
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                <h3>ReactPWA + Auth</h3>
              </Link>
              <span
                className={isMenuOpen ? 'navbar-burger burger is-active' : 'navbar-burger burger'}
                data-target="navbarMenu"
                onClick={() => this.toggleMenu()}
              >
                <span />
                <span />
                <span />
              </span>
            </div>
            <div id="navbarMenu" className={isMenuOpen ? 'navbar-menu is-active' : 'navbar-menu'}>
              <div className="navbar-end">
                <div className="tabs is-right">
                  <ul style={{ border: '0' }} className="header-links">
                    <li>
                      <Link to="/">
                        Home
                      </Link>
                    </li>
                    {
                      !isLoggedIn
                      && (
                        <li>
                          <Link to="/login">
                            Login
                          </Link>
                        </li>
                      )
                    }
                    {
                      isLoggedIn
                      && (
                        <React.Fragment>
                          <li>
                            <Link to="/dashboard">
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link to="/logout">
                              Logout
                            </Link>
                          </li>
                        </React.Fragment>
                      )
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withCookies(Header);
