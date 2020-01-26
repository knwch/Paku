import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import moment from 'moment';

class RegistFormStep2 extends Component {

  constructor() {
    super();
    this.validator = new SimpleReactValidator({
      element: message => <small className="text-danger font-weight-bold">{message}</small>,
      messages: {
        required: 'โปรดระบุ:attribute',
        date: 'โปรดระบุวันเกิด',
        size: 'โปรดระบุเลขบัตรประชาชน 13 หลัก'
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

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="col-md-5 ml-auto mr-auto">
        <h4 className="mb-4">ลงทะเบียน</h4>
        <form className="text-left">
          <div>วันเกิด</div>
          <small>ผู้ลงทะเบียนจะต้องมีอายุ 18 ปีบริบูรณ์ขึ้นไป ผู้อื่นที่จะใช้ Paku จะไม่เห็นวันเกิดคุณ</small>
          <div className="form-group text-left">
            <input type="date" className="form-control" onChange={handleChange('birth')} defaultValue={values.birth} placeholder="วันเกิด" />
            {this.validator.message('วันเกิด', values.birth && moment(values.birth, 'YYYY-DD-MM'), 'required|date')}
          </div>
          <div>บัตรประชาชน</div>
          <small>เพื่อทำการยืนยันตัวตนของคุณ คุณสามารถดูตัวอย่างการอัพโหลดได้ที่นี่</small>
          <div className="form-group text-left">
            <input type="text" className="form-control" onChange={handleChange('card')} defaultValue={values.card} placeholder="เลขบัตรประชาชน" />
            {this.validator.message('เลขบัตรประชาชน', values.card, 'required|size:13,string')}
          </div>
          <div className="row">
            <div className="form-group col-md-6 pr-1">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="customFile" />
                <label class="custom-file-label" for="customFile">Choose file</label>
              </div>
            </div>
            <div className="form-group col-md-6 pl-1">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="customFile" />
                <label class="custom-file-label" for="customFile">Choose file</label>
              </div>
            </div>
          </div>
          <button onClick={this.back} className="btn btn-danger">ย้อนกลับ</button>
          <button onClick={this.continue} className="btn btn-primary">ถัดไป</button>
        </form>
      </div>
    );
  }
}

export default RegistFormStep2;