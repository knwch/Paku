import React, { Component } from 'react';

class RegistSuccess extends Component {
  
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
    return (
      <div>
        ลงทะเบียนสำเร็จ
      </div>
    );
  }
}

export default RegistSuccess;
