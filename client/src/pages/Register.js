import React, { Component } from 'react';
import RegistFormStep1 from '../components/forms/registerforms/RegistFormStep1';
import RegistFormStep2 from '../components/forms/registerforms/RegistFormStep2';
import RegistConfirm from '../components/forms/registerforms/RegistConfirm';
import RegistSuccess from '../components/forms/registerforms/RegistSuccess';

class Register extends Component {

  state = {
    step: 1,
    username: '',
    password: '',
    confirmpassword: '',
    firstname: '',
    lastname: '',
    telephone: '',
    email: '',
    birth: '',
    card: ''
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { username,
      password,
      confirmpassword,
      firstname,
      lastname,
      telephone,
      email,
      birth,
      card } = this.state;
    const values =
    {
      username,
      password,
      confirmpassword,
      firstname,
      lastname,
      telephone,
      email,
      birth,
      card
    };

    // eslint-disable-next-line default-case
    switch (step) {
      case 1:
        return (
          <div className="container-fluid">
            <RegistFormStep1
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              values={values}
            />
          </div>
        );
      case 2:
        return (
          <div className="container-fluid">
            <RegistFormStep2
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
            />
          </div>
        );
      case 3:
        return (
          <div className="container-fluid">
            <RegistConfirm
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              values={values}
            />
          </div>
        );
      case 4:
        return (
          <div className="container-fluid">
            <RegistSuccess />
          </div>
        );
    }

  }
}

export default Register;