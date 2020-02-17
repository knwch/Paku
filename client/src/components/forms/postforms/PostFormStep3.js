import React, { Component } from 'react';

class PostFormStep3 extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="col-md-5 text-left pr-auto">
        <button onClick={this.back} className="btn btn-danger">ย้อนกลับ</button>
        <h4 className="mb-3">ลงประกาศที่จอดรถ</h4>
        <h6 className="mb-4">ขั้นตอนที่ 3</h6>
        <form className="text-left">
          <text>เพิ่มราคาที่จอดรถของคุณ</text><br />
          <small>เพิ่มราคาที่จอดรถของคุณ</small>
          <div className="form-group">
            <input type="text" className="form-control" onChange={handleChange('price')} defaultValue={values.price} placeholder="กรุณากรอกราคาที่คุณต้องการ (เฉพาะตัวเลข)" />
          </div>
          <text>เพิ่มรูปภาพที่จอดรถของคุณ</text><br />
          <div className="form-group">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="customFile" />
              <label class="custom-file-label" for="customFile">Choose file</label>
            </div>
          </div>
          <button onClick={this.continue} className="btn btn-primary">ประกาศ</button>
        </form>
      </div>
    );
  }
}

export default PostFormStep3;