import React, { Component } from "react";
import { Link } from "react-router-dom";

class Owner extends Component {
  componentDidMount() {
    document.title = "🐤 Paku";
  }
  
  render() {
    return (
      <div className="container-fluid">
        <div>
          <h4 className="mb-4">วิธีเริ่มให้เช่าที่จอดรถ</h4>
          <p>การลงประกาศที่จอดรถบน PAKU ไม่ใช่เรื่องยาก...</p>
          <Link className="nav-link" to="/login">
            <button className="btn btn-primary">เริ่มต้น</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Owner;
