import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Icon, Input, Button, Form, Label } from 'semantic-ui-react';

class LoginForm extends Component {

  constructor() {
    super();
    this.validator = new SimpleReactValidator({
      element: message => <Label basic color='red' pointing>{message}</Label>,
      messages: {
        required: 'โปรดระบุ:attribute',
      }
    });
  };

  continue = e => {
    if (this.validator.allValid()) {
      e.preventDefault();
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="col-md-5 ml-auto mr-auto">
        <h4 className="mb-4">เข้าสู่ระบบ</h4>
        <Form>

          <Form.Field className="text-left">
            <Input fluid iconPosition='left' placeholder='ชื่อผู้ใช้'>
              <Icon name='user' />
              <input type="text" className="form-control" onChange={handleChange('username')} defaultValue={values.username} />
            </Input>
            {this.validator.message('ชื่อผู้ใช้', values.username, 'required')}
          </Form.Field>

          <Form.Field className="text-left">
            <Input fluid iconPosition='left' placeholder='รหัสผ่าน'>
              <Icon name='lock' />
              <input type="text" className="form-control" onChange={handleChange('password')} defaultValue={values.password} />
            </Input>
            {this.validator.message('รหัสผ่าน', values.password, 'required')}
          </Form.Field>

          <Button onClick={this.continue} className='btn-paku' color='yellow' animated>
            <Button.Content visible>เข้าสู่ระบบ</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>

        </Form>
      </div>
    );
  }
}

export default LoginForm;