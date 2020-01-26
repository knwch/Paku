import React, { Component } from 'react';

class RegistConfirm extends Component {

  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { username,
        firstname,
        lastname,
        telephone,
        email,
        birth }
    } = this.props;

    return (
      <div className="col-md-5 ml-auto mr-auto">
        <div className="Card">
          <div className="card mb-4">
            <div className="card-header">
              ตรวจสอบความถูกต้อง
            </div>
            <div className="card-body text-left p-2">
              <text className="card-text">ชื่อผู้ใช้: {username}</text><br/>
              <text className="card-text">ชื่อ: {firstname} {lastname}</text><br/>
              <text className="card-text">เบอร์โทรศัพท์: {telephone}</text><br/>
              <text className="card-text">อีเมล: {email}</text><br/>
              <text className="card-text">วันเกิด: {birth}</text>
            </div>
          </div>
        </div>
        <button onClick={this.back} className="btn btn-danger">ย้อนกลับ</button>
        <button onClick={this.continue} className="btn btn-primary">ยืนยัน</button>
      </div>

    );
  }
}

export default RegistConfirm;
