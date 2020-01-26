import React, { Component } from 'react';

class PostFormStep1 extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="col-md-5 text-left pr-auto">
        <h4 className="mb-3">ลงประกาศที่จอดรถ</h4>
        <form>
          <text>ให้เรารู้จักที่จอดรถของคุณ</text>
          <div className="form-group">
            <input type="text" className="form-control" onChange={handleChange('name')} defaultValue={values.name} placeholder="ชื่อที่จอดรถ" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" onChange={handleChange('location')} defaultValue={values.location} placeholder="ตำแหน่งที่จอดรถ" />
          </div>
          <h6>ขั้นตอนที่ 1</h6>
          <h5 className="mb-4">ที่จอดรถของคุณเป็นแบบไหน</h5>
          <div className="row">
            <div className="form-group col-md-6 pr-1">
              <select class="form-control" onChange={handleChange('parkingtype')} defaultValue={values.parkingtype}>
                <option selected disabled>ประเภทที่จอดรถ</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <div className="form-group col-md-6 pl-1">
              <input type="text" className="form-control" onChange={handleChange('slot')} defaultValue={values.slot} placeholder="จำนวนที่จอดรถ" />
            </div>
          </div>
          <text>ประเภทรถที่สามารถจอดได้</text>
          <div className="form-group">
            <input type="text" className="form-control" onChange={handleChange('cartype')} defaultValue={values.cartype} placeholder="..." />
          </div>
          <text>ประเภทรถที่สามารถจอดได้</text>
          <div className="row">
            <div className="form-group col-md-6 pr-1">
              <input type="text" className="form-control" onChange={handleChange('open')} defaultValue={values.open} placeholder="ตั้งแต่" />
            </div>
            <div className="form-group col-md-6 pl-1">
              <input type="text" className="form-control" onChange={handleChange('close')} defaultValue={values.close} placeholder="จนถึง" />
            </div>
          </div>
          <button onClick={this.continue} className="btn btn-primary">ถัดไป</button>
        </form>
      </div>
    );
  }
}
export default PostFormStep1;