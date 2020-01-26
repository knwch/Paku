import React, { Component } from 'react';

class PostConfirm extends Component {

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
      values: {
        name,
        location,
        parkingtype,
        slot,
        cartype,
        open,
        close,
        detail,
        rule,
        nearby,
        facility,
        price,
        picture }
    } = this.props;

    return (
      <div className="col-md-5 ml-auto mr-auto">
        <li>
          {name}
        </li>
        <li>
          {location}
        </li>
        <li>
          {parkingtype}
        </li>
        <li>
          {slot}
        </li>
        <li>
          {cartype}
        </li>
        <li>
          {open}
        </li>
        <li>
          {close}
        </li>
        <li>
          {detail}
        </li>
        <li>
          {rule}
        </li>
        <li>
          {nearby}
        </li>
        <li>
          {facility}
        </li>
        <li>
          {price}
        </li>
        <li>
          {picture}
        </li>
        <button onClick={this.back} className="btn btn-danger">ย้อนกลับ</button>
        <button onClick={this.continue} className="btn btn-primary">ยืนยัน</button>
      </div>

    );
  }
}

export default PostConfirm;
