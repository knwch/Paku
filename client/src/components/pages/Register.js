import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Responsive, Container, Icon, Input, Button, Label, Form, Grid, Checkbox } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      username: '',
      password: '',
      confirmpassword: '',
      firstname: '',
      lastname: '',
      telephone: '',
      email: '',
      birth: '',
      checkinfo: false,
      errors: {}
    };

    this.onChange = this.onSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      element: message => <Label basic color='red' pointing>{message}</Label>,
      messages: {
        required: 'โปรดระบุ:attribute',
        alpha_num: 'โปรดระบุเฉพาะตัวอักษรหรือตัวเลขเท่านั้น',
        string: 'โปรดระบุเฉพาะตัวอักษรเท่านั้น',
        phone: 'โปรดระบุเบอร์โทรศัพท์ 10 หลัก',
        email: 'โปรดระบุอีเมล',
        date: 'โปรดระบุวันเกิด',
        size: 'โปรดระบุเลขบัตรประชาชน 13 หลัก'
      }
    });

  };

  componentDidMount() {
    document.title = "🐤 register"
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // // Proceed to next step
  // nextStep = () => {
  //   const { step } = this.state;
  //   this.setState({
  //     step: step + 1
  //   });
  // };

  // // Go back to prev step
  // prevStep = () => {
  //   const { step } = this.state;
  //   this.setState({
  //     step: step - 1
  //   });
  // };

  onSubmit = e => {
    if (this.validator.allValid()) {
      e.preventDefault();
      const newUser = {
        username: this.state.username,
        password: this.state.password,
        password2: this.state.confirmpassword,
        fname: this.state.firstname,
        lname: this.state.lastname,
        email: this.state.email,
        birth: this.state.birth,
        phone: this.state.telephone
      }

      this.props.registerUser(newUser, this.props.history);
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  }

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const errors = this.state.errors;
    // eslint-disable-next-line default-case
    return (
      <Responsive>
        <Container fluid>
          <Grid className='mb-4' centered>
            <Grid.Column mobile={14} tablet={7} computer={6}>

              <h4 className="text-center mb-4">ลงทะเบียน (Beta)</h4>
              <Form className="text-left">

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='ชื่อผู้ใช้'>
                    <Icon name='user' />
                    <input type="text" className="form-control" onChange={this.handleChange('username')} defaultValue={this.state.username} />
                  </Input>
                  {/* {this.validator.message('ชื่อผู้ใช้', this.state.username, 'required|alpha_num')} */}
                </Form.Field>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='สร้างรหัสผ่าน'>
                    <Icon name='unlock' />
                    <input type="password" className="form-control" onChange={this.handleChange('password')} defaultValue={this.state.password} />
                  </Input>
                  {/* {this.validator.message('รหัสผ่าน', values.password, 'required')} */}
                </Form.Field>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='ยืนยันรหัสผ่าน'>
                    <Icon name='unlock alternate' />
                    <input type="password" className="form-control" onChange={this.handleChange('confirmpassword')} defaultValue={this.state.confirmpassword} />
                  </Input>
                  {/* {this.validator.message('ยืนยันรหัสผ่าน', values.confirmpassword, `required|in:${values.password}`, { messages: { in: 'รหัสผ่านไม่ตรงกัน' } })} */}
                </Form.Field>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='ชื่อจริง'>
                    <Icon name='vcard' />
                    <input type="text" className="form-control" onChange={this.handleChange('firstname')} defaultValue={this.state.firstname} />
                  </Input>
                  {/* {this.validator.message('ชื่อจริง', values.firstname, 'required|string')} */}
                </Form.Field>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='นามสกุล'>
                    <Icon name='vcard' />
                    <input type="text" className="form-control" onChange={this.handleChange('lastname')} defaultValue={this.state.lastname} />
                  </Input>
                  {/* {this.validator.message('นามสกุล', values.lastname, 'required|string')} */}
                </Form.Field>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='เบอร์โทรศัพท์'>
                    <Icon name='phone' flipped='horizontally' />
                    <input type="text" className="form-control" onChange={this.handleChange('telephone')} defaultValue={this.state.telephone} />
                  </Input>
                  {/* {this.validator.message('เบอร์โทรศัพท์', values.telephone, 'required|phone')} */}
                </Form.Field>

                <Form.Field>
                  <Input fluid iconPosition='left' placeholder='อีเมล'>
                    <Icon name='envelope' />
                    <input type="email" className="form-control" onChange={this.handleChange('email')} defaultValue={this.state.email} />
                  </Input>
                  {/* {this.validator.message('อีเมล', values.email, 'required|email')} */}
                </Form.Field>

                <Form.Field>
                  <div>วันเกิด</div>
                  <small>ผู้ลงทะเบียนจะต้องมีอายุ 18 ปีบริบูรณ์ขึ้นไป ผู้อื่นที่จะใช้ Paku จะไม่เห็นวันเกิดคุณ</small>
                  <Input fluid iconPosition='left' placeholder='วันเกิด'>
                    <Icon name='birthday' />
                    <input type="date" className="form-control" onChange={this.handleChange('birth')} defaultValue={this.state.birth} />
                  </Input>
                  {/* {this.validator.message('วันเกิด', values.birth && moment(values.birth, 'YYYY-DD-MM'), 'required|date')} */}
                </Form.Field>

                <Form.Field>
                  <Checkbox label='I agree to the Terms and Conditions'/>
                </Form.Field>

                <div className='d-flex justify-content-end'>
                  <Button onClick={this.onSubmit} className='btn-paku' color='yellow' animated>
                    <Button.Content visible>ยืนยัน</Button.Content>
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

const mapStateToPrps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToPrps, { registerUser })(withRouter(Register))