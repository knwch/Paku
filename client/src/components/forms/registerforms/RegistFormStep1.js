import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';

class RegistFormStep1 extends Component {

  constructor() {
    super();
    this.validator = new SimpleReactValidator({
      element: message => <small className="text-danger font-weight-bold">{message}</small>,
      messages: {
        required:'โปรดระบุ:attribute',
        alpha_num:'โปรดระบุเฉพาะตัวอักษรหรือตัวเลขเท่านั้น',
        string:'โปรดระบุเฉพาะตัวอักษรเท่านั้น',
        phone:'โปรดระบุเบอร์โทรศัพท์ 10 หลัก',
        email: 'โปรดระบุอีเมล'
      }
    });
  };

  continue = e => {
    if (this.validator.allValid()) {
      e.preventDefault();
      this.props.nextStep();
    } else {
      e.preventDefault();
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="col-md-5 ml-auto mr-auto">
        <h4 className="mb-4">ลงทะเบียน</h4>
        <form>
          <div className="form-group text-left">
            <input type="text" className="form-control" onChange={handleChange('username')} defaultValue={values.username} placeholder="ชื่อผู้ใช้" />
            {this.validator.message('ชื่อผู้ใช้', values.username, 'required|alpha_num')}
          </div>
          <div className="form-group text-left">
            <input type="password" className="form-control" onChange={handleChange('password')} defaultValue={values.password} placeholder="สร้างรหัสผ่าน" />
            {this.validator.message('รหัสผ่าน', values.password, 'required')}
          </div>
          <div className="form-group text-left">
            <input type="password" className="form-control" onChange={handleChange('confirmpassword')} defaultValue={values.confirmpassword} placeholder="ยืนยันรหัสผ่าน" />
            {this.validator.message('ยืนยันรหัสผ่าน', values.confirmpassword, `required|in:${values.password}`, {messages: {in: 'รหัสผ่านไม่ตรงกัน'}})}
          </div>
          <div className="form-group text-left">
            <input type="text" className="form-control" onChange={handleChange('firstname')} defaultValue={values.firstname} placeholder="ชื่อจริง" />
            {this.validator.message('ชื่อจริง', values.firstname, 'required|string')}
          </div>
          <div className="form-group text-left">
            <input type="text" className="form-control" onChange={handleChange('lastname')} defaultValue={values.lastname} placeholder="นามสกุล" />
            {this.validator.message('นามสกุล', values.lastname, 'required|string')}
          </div>
          <div className="form-group text-left">
            <input type="text" className="form-control" onChange={handleChange('telephone')} defaultValue={values.telephone} placeholder="เบอร์โทรศัพท์" />
            {this.validator.message('เบอร์โทรศัพท์', values.telephone, 'required|phone')}
          </div>
          <div className="form-group text-left">
            <input type="email" className="form-control" onChange={handleChange('email')} defaultValue={values.email} placeholder="อีเมล" />
            {this.validator.message('อีเมล', values.email, 'required|email')}
          </div>
          <button onClick={this.continue} className="btn btn-primary">ถัดไป</button>
        </form>
      </div>
    );
  }
}
export default RegistFormStep1;