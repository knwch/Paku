import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Responsive, Container, Icon, Input, Button, Form, Label, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../redux/actions/authActions';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {}
    };
    
    this.onSubmit = this.onSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      element: message => <Label basic color='red' pointing>{message}</Label>,
      messages: {
        required: 'โปรดระบุ:attribute',
      }
    });
  }

  componentDidMount() {
    document.title = '🐤 Login';
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  // onSubmit = e => {
  //   e.preventDefault();

  //   const userData = {
  //     username: this.state.username,
  //     password: this.state.password
  //   };

  //   this.props.loginUser(userData);
  // }
  
  onSubmit(e) {
    if (this.validator.allValid()) {
      e.preventDefault();
      const userData = {
        username: this.state.username,
        password: this.state.password
      }
  
      this.props.loginUser(userData);
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };

  render() {
    const errors = this.state.errors;
    return (
      <Responsive>
        <Container fluid>
          <Grid className='mb-4' centered>
            <Grid.Column mobile={14} tablet={7} computer={6}>
              <h4 className="text-center mb-4">เข้าสู่ระบบ</h4>
              <Form>

                <Form.Field className="text-left">
                  <Input fluid iconPosition='left' placeholder='ชื่อผู้ใช้'>
                    <Icon name='user' />
                    <input type="text" className="form-control" onChange={this.handleChange('username')} defaultValue={this.state.username} />
                  </Input>
                  {this.validator.message('ชื่อผู้ใช้', this.state.username, 'required')}
                  <div className="container">
                    { errors.username }
                  </div>
                </Form.Field>

                <Form.Field className="text-left">
                  <Input fluid iconPosition='left' placeholder='รหัสผ่าน'>
                    <Icon name='lock' />
                    <input type="text" className="form-control" onChange={this.handleChange('password')} defaultValue={this.state.password} />
                  </Input>
                  {this.validator.message('รหัสผ่าน', this.state.password, 'required')}
                  <div className="container">
                    { errors.password }
                  </div>
                </Form.Field>
                
                <div className='text-center'>
                  <Button onClick={this.onSubmit} className='btn-paku' color='yellow' animated>
                    <Button.Content visible>เข้าสู่ระบบ</Button.Content>
                    <Button.Content hidden>
                      <Icon name='arrow right' />
                    </Button.Content>
                  </Button>
                </div>

              </Form>
            </Grid.Column>
          </Grid>
        </Container>
      </Responsive>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(mapStateToProps, { loginUser })(withRouter(Login));