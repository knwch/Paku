import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Icon, Input, Button, Label, Form, Checkbox } from 'semantic-ui-react';
import moment from 'moment';

class RegistFormStep2 extends Component {

  constructor() {
    super();
    this.validator = new SimpleReactValidator({
      element: message => <Label basic color='red' pointing>{message}</Label>,
      messages: {
        required: 'โปรดระบุ:attribute',
        date: 'โปรดระบุวันเกิด',
        size: 'โปรดระบุเลขบัตรประชาชน 13 หลัก'
      }
    });
  };

  fileInputRef = React.createRef();

  fileChange = e => {
    this.setState({ file: e.target.files[0] }, () => {
      console.log("File chosen --->", this.state.file);
    });
  };

  continue = e => {
    if (this.validator.allValid()) {
      e.preventDefault();
      this.props.nextStep();
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="col-md-5 ml-auto mr-auto">
        <h4 className="mb-4">ลงทะเบียน</h4>
        <Form className="text-left">

          <Form.Field>
            <div>วันเกิด</div>
            <small>ผู้ลงทะเบียนจะต้องมีอายุ 18 ปีบริบูรณ์ขึ้นไป ผู้อื่นที่จะใช้ Paku จะไม่เห็นวันเกิดคุณ</small>
            <Input fluid iconPosition='left' placeholder='วันเกิด'>
              <Icon name='birthday' />
              <input type="date" className="form-control" onChange={handleChange('birth')} defaultValue={values.birth} />
            </Input>
            {this.validator.message('วันเกิด', values.birth && moment(values.birth, 'YYYY-DD-MM'), 'required|date')}
          </Form.Field>

          <Form.Field>
            <div>บัตรประชาชน</div>
            <small>เพื่อทำการยืนยันตัวตนของคุณ คุณสามารถดูตัวอย่างการอัพโหลดได้ที่นี่</small>
            <Input fluid iconPosition='left' placeholder='เลขบัตรประชาชน' maxLength="13">
              <Icon name='vcard' />
              <input type="text" className="form-control" onChange={handleChange('card')} defaultValue={values.card} />
            </Input>
            {this.validator.message('เลขบัตรประชาชน', values.card, 'required|size:13,string')}
          </Form.Field>

          <Form.Group widths='equal'>
            <Form.Field>
              <Button
                className='btn-paku-light'
                content="Choose File"
                labelPosition="left"
                icon="bordered file"
                onClick={() => this.fileInputRef.current.click()}
                fluid />
              <input
                ref={this.fileInputRef}
                type="file"
                hidden
                onChange={this.fileChange}
              />
            </Form.Field>
            <Form.Field>
              <Button
                className='btn-paku-light'
                content="Choose File"
                labelPosition="left"
                icon="file"
                onClick={() => this.fileInputRef.current.click()}
                fluid />
              <input
                ref={this.fileInputRef}
                type="file"
                hidden
                onChange={this.fileChange}
              />
            </Form.Field>
          </Form.Group>

          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>

          <Button onClick={this.back} className='btn-paku' animated>
            <Button.Content visible>ย้อนกลับ</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow left' />
            </Button.Content>
          </Button>
          <Button onClick={this.continue} className='btn-paku' animated>
            <Button.Content visible>ถัดไป</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </Form>
      </div>
    );
  }
}

export default RegistFormStep2;