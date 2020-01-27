import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Icon, Input, Button, Label } from 'semantic-ui-react';

class RegistFormStep1 extends Component {

  constructor() {
    super();
    this.validator = new SimpleReactValidator({
      
      element: message => <Label basic color='red' pointing>{message}</Label>,
      messages: {
        required: 'โปรดระบุ:attribute',
        alpha_num: 'โปรดระบุเฉพาะตัวอักษรหรือตัวเลขเท่านั้น',
        string: 'โปรดระบุเฉพาะตัวอักษรเท่านั้น',
        phone: 'โปรดระบุเบอร์โทรศัพท์ 10 หลัก',
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
            <Input fluid iconPosition='left' placeholder='ชื่อผู้ใช้'>
              <Icon name='user' />
              <input type="text" className="form-control" onChange={handleChange('username')} defaultValue={values.username} />
            </Input>
            {this.validator.message('ชื่อผู้ใช้', values.username, 'required|alpha_num')}
          </div>
          <div className="form-group text-left">
            <Input fluid iconPosition='left' placeholder='สร้างรหัสผ่าน'>
              <Icon name='unlock' />
              <input type="password" className="form-control" onChange={handleChange('password')} defaultValue={values.password} />
            </Input>
            {/* {this.validator.message('รหัสผ่าน', values.password, 'required')} */}
          </div>
          <div className="form-group text-left">
            <Input fluid iconPosition='left' placeholder='ยืนยันรหัสผ่าน'>
              <Icon name='unlock alternate' />
              <input type="password" className="form-control" onChange={handleChange('confirmpassword')} defaultValue={values.confirmpassword} />
            </Input>
            {/* {this.validator.message('ยืนยันรหัสผ่าน', values.confirmpassword, `required|in:${values.password}`, { messages: { in: 'รหัสผ่านไม่ตรงกัน' } })} */}
          </div>
          <div className="form-group text-left">
            <Input fluid iconPosition='left' placeholder='ชื่อจริง'>
              <Icon name='vcard' />
              <input type="text" className="form-control" onChange={handleChange('firstname')} defaultValue={values.firstname} />
            </Input>
            {/* {this.validator.message('ชื่อจริง', values.firstname, 'required|string')} */}
          </div>
          <div className="form-group text-left">
            <Input fluid iconPosition='left' placeholder='นามสกุล'>
              <Icon name='vcard' />
              <input type="text" className="form-control" onChange={handleChange('lastname')} defaultValue={values.lastname} />
            </Input>
            {/* {this.validator.message('นามสกุล', values.lastname, 'required|string')} */}
          </div>
          <div className="form-group text-left">
            <Input fluid iconPosition='left' placeholder='เบอร์โทรศัพท์'>
              <Icon name='phone' />
              <input type="text" className="form-control" onChange={handleChange('telephone')} defaultValue={values.telephone} />
            </Input>
            {/* {this.validator.message('เบอร์โทรศัพท์', values.telephone, 'required|phone')} */}
          </div>
          <div className="form-group text-left">
            <Input fluid iconPosition='left' placeholder='อีเมล'>
              <Icon name='envelope' />
              <input type="email" className="form-control" onChange={handleChange('email')} defaultValue={values.email} />
            </Input>
            {/* {this.validator.message('อีเมล', values.email, 'required|email')} */}
          </div>
          <Button onClick={this.continue} animated>
            <Button.Content visible>ถัดไป</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </form>
      </div>
    );
  }
}
export default RegistFormStep1;