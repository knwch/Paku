import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';

class LoginForm extends Component {

  constructor() {
    super();
    this.validator = new SimpleReactValidator({
      element: message => <small className="text-danger font-weight-bold">{message}</small>,
      messages: {
        required:'โปรดระบุ:attribute',
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
            <input type="text" className="form-control" onChange={handleChange('username')} defaultValue={values.username} placeholder="ชื่อผู้ใช้" />
            {this.validator.message('ชื่อผู้ใช้', values.username, 'required')}
          </div>
          <div className="form-group col-md-12 text-left">
            <input type="text" className="form-control" onChange={handleChange('password')} defaultValue={values.password} placeholder="รหัสผ่าน" />
            {this.validator.message('รหัสผ่าน', values.password, 'required')}
          </div>
          <button onClick={this.continue} className="btn btn-primary">เข้าสู่ระบบ</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;