import React, { Component } from 'react';

class PostFormStep2 extends Component {

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
        <h6 className="mb-4">ขั้นตอนที่ 2</h6>
        <form className="text-left">
          <text>ให้เรารู้จักที่จอดรถของคุณ</text>
          <div className="form-group">
            <input type="text" className="form-control" onChange={handleChange('detail')} defaultValue={values.detail} placeholder="อธิบายที่จอดรถของคุณให้ผู้จองได้รู้" />
          </div>
          <text>กฎที่จอดรถ</text><br />
          <small>เพิ่มกฎของคุณให้ผู้เช่าได้รู้ และสร้างความสบายใจให้กับทั้งสองฝ่าย</small>
          <div class="form-group">
            <input type="text" className="form-control" onChange={handleChange('rule')} defaultValue={values.rule} placeholder="เพิ่มกฎของคุณ (ไม่บังคับ)" />
          </div>
          <text>สถานที่ใกล้เคียงกับที่จอดรถ</text>
          <div class="form-group">
            <input type="text" className="form-control" onChange={handleChange('nearby')} defaultValue={values.nearby} placeholder="ชื่อสถานที่" />
          </div>
          <text>สิ่งอำนวยความสะดวก</text>
          <div class="form-group">
            <input type="text" className="form-control" onChange={handleChange('facility')} defaultValue={values.facility} placeholder="สิ่งอำนวยความสะดวก" />
          </div>
          <button onClick={this.continue} className="btn btn-primary">ถัดไป</button>
        </form>
      </div>
    );
  }
}

export default PostFormStep2;