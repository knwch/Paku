import React, { Component } from 'react';
import LoginForm from '../components/forms/loginforms/LoginForm';

class Login extends Component {

  state = {
    username: '',
    password: ''
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { username,
      password } = this.state;
    const values =
    {
      username,
      password
    };

    return (
      <div className="container-fluid">
        <LoginForm
          handleChange={this.handleChange}
          values={values} />
      </div>
    );
  }
}

export default Login;