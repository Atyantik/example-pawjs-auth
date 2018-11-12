import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Layout from '../Layout';

class Login extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      errMsg: '',
    };
  }


  doLogin(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const { username, password } = this.state;
    const { cookies } = this.props;
    if (username !== 'demo' || password !== 'demo') {
      this.setState({
        error: username !== 'demo' ? 'username' : 'password',
        errMsg: 'Username or Password is incorrect. Please enter the correct credentials.',
      });
      return;
    }
    cookies.set('user', 'demo');
  }

  handleChange(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const {
      username,
      password,
      error,
      errMsg,
    } = this.state;
    const { cookies } = this.props;
    if (cookies.get('user') === 'demo') {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Layout>
        <section className="hero is-fullheight is-info is-medium is-bold">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column is-6 is-offset-3">
                  <form onSubmit={e => this.doLogin(e)}>
                    <h1 className="title has-text-centered">
                      Login
                    </h1>
                    <div className="box">
                      <label htmlFor="username" className="label">
                        Username
                        <p className="control has-icon has-icon-right">
                          <input
                            name="username"
                            type="text"
                            placeholder="username"
                            value={username}
                            className={`input ${error === 'username' ? 'is-danger' : ''}`}
                            onChange={e => this.handleChange(e)}
                          />
                        </p>
                      </label>
                      <label htmlFor="password" className="label">
                        Password
                        <p className="control has-icon has-icon-right">
                          <input
                            name="password"
                            className={`input ${error === 'password' ? 'is-danger' : ''}`}
                            type="password"
                            placeholder="●●●●●●●"
                            value={password}
                            onChange={e => this.handleChange(e)}
                          />
                        </p>
                      </label>
                      <p className="has-text-grey">username: demo</p>
                      <p className="has-text-grey">password: demo</p>
                      {
                        error !== '' && (
                          <p className="help is-danger">
                            {errMsg}
                          </p>
                        )
                      }
                      <hr />
                      <p className="control">
                        <button
                          type="submit"
                          className="button is-primary is-medium is-fullwidth"
                        >
                          Login
                        </button>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
export default withCookies(Login);
