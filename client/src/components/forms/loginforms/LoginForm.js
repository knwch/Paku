import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Icon, Input, Button } from 'semantic-ui-react';

class LoginForm extends Component {

  constructor() {
    super();
    this.validator = new SimpleReactValidator({
      element: message => <small className="text-danger font-weight-bold">{message}</small>,
      messages: {
        required: 'โปรดระบุ:attribute',
      }
    });
  };

  // continue = e => {
  //   if (this.validator.allValid()) {
  //     e.preventDefault();
  //   } else {
  //     e.preventDefault();
  //     this.validator.showMessages();
  //     // rerender to show messages for the first time
  //     // you can use the autoForceUpdate option to do this automatically`
  //     this.forceUpdate();
  //   }
  // };

  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="col-md-5 ml-auto mr-auto">
        <h4 className="mb-4">เข้าสู่ระบบ</h4>
        <form>
          <div className="form-group col-md-12 text-left">
            <Input fluid iconPosition='left' placeholder='ชื่อผู้ใช้'>
              <Icon name='user' />
              <input type="text" className="form-control" onChange={handleChange('username')} defaultValue={values.username} />
            </Input>
            {this.validator.message('ชื่อผู้ใช้', values.username, 'required')}
          </div>
          <div className="form-group col-md-12 text-left">
            <Input fluid iconPosition='left' placeholder='รหัสผ่าน'>
              <Icon name='lock' />
              <input type="text" className="form-control" onChange={handleChange('password')} defaultValue={values.password} />
            </Input>
            {this.validator.message('รหัสผ่าน', values.password, 'required')}
          </div>
          <Button onClick={this.continue} >เข้าสู่ระบบ</Button>
        </form>
      </div>
    );
  }
}

export default LoginForm;