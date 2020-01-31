import React, { Component } from 'react';
import { Responsive, Container } from 'semantic-ui-react';
import LoginForm from '../components/forms/loginforms/LoginForm';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

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
      <Responsive>
        <Container fluid>
          <LoginForm
            handleChange={this.handleChange}
            values={values} />
        </Container>
      </Responsive>
    );
  }
}

export default Login;