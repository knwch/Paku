import React, { Component } from 'react';

class FormBooking extends Component {

  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="ml-auto mr-auto">
        <h4 className="mb-4">จองที่จอดรถ</h4>
        <form>
          <div className="row">
            <div className="form-group col-md-12">
              <input type="text" className="form-control" onChange={handleChange('username')} defaultValue={values.date} placeholder="วันที่เข้าจอด" />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6 pr-1">
              <input type="text" className="form-control" onChange={handleChange('checkin')} defaultValue={values.checkin} placeholder="เวลาเข้าจอด" />
            </div>
            <div className="form-group col-md-6 pl-1">
              <input type="text" className="form-control" onChange={handleChange('checkout')} defaultValue={values.checkout} placeholder="เวลาออก" />
            </div>
          </div>
          <h5 className="mb-4">รายละเอียดของคุณ</h5>
          <div className="row">
            <div className="form-group col-md-6 pr-1">
              <input type="text" className="form-control" onChange={handleChange('telephone')} defaultValue={values.telephone} placeholder="เบอร์ติดต่อ" />
            </div>
            <div className="form-group col-md-6 pl-1">
              <input type="text" className="form-control" onChange={handleChange('plate')} defaultValue={values.plate} placeholder="ทะเบียนรถ" />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <input type="text" className="form-control" onChange={handleChange('note')} defaultValue={values.note} placeholder="หมายเหตุถึงเจ้าของที่จอดรถ" />
            </div>
          </div>
          <h5 className="mb-4">เลือกวิธีการชำระเงิน</h5>
          <div className="row">
            <div className="form-group col-md-12">
              <input type="text" className="form-control" onChange={handleChange('email')} defaultValue={values.email} placeholder="เงินสด" />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-12">
              <div className="border-top pt-2">
                <text>ราคาที่จอดรถ</text><br />
                <text>จำนวน</text><br />
                <text>ราคารวม</text>
              </div>
            </div>
          </div>
          <button className="btn btn-primary">จองทันที</button>
        </form>
      </div>
    );
  }
}

export default FormBooking;