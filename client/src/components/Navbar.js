import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div className="mb-4">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/"><img className="logo-paku" src={require('./imgs/Logo.png')} /></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/owner">ให้เช่าที่จอดรถ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/rent">จองที่จอดรถ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/support">ช่วยเหลือ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">ลงทะเบียน</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">เข้าสู่ระบบ</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;