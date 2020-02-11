import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';

class NavMenu extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const guestLinks = (
            <Nav className="ml-auto nowrap">
                <Nav.Link href="/owner">ให้เช่าที่จอดรถ</Nav.Link>
                <Nav.Link href="/rent">จองที่จอดรถ</Nav.Link>
                <Nav.Link href="/support">ช่วยเหลือ</Nav.Link>
                <Nav.Link href="/register">ลงทะเบียน</Nav.Link>
                <Nav.Link href="/login">เข้าสู่ระบบ</Nav.Link>
            </Nav>
        );
        const authLinks = (
            <Nav className="ml-auto nowrap">
                <Nav.Link href="/owner">ให้เช่าที่จอดรถ</Nav.Link>
                <Nav.Link href="/rent">จองที่จอดรถ</Nav.Link>
                <Nav.Link href="/support">ช่วยเหลือ</Nav.Link>
                <Nav.Link href="/profile">โปรไฟล์</Nav.Link>
                <Nav.Link onClick={this.onLogout.bind(this)}>ออกจากระบบ</Nav.Link>
            </Nav>
        );

        return (
            <div className="my-3 mx-3" id="nav-color" >
                {/* <Navbar className="justify-content-center" expand="sm">
                    <div className="d-flex w-50 mr-auto">
                        <Navbar.Brand href="/">
                            <img className="logo-paku" src={require("./imgs/Logo.png")} />
                        </Navbar.Brand>
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="w-100" id="basic-navbar-nav">
                        {isAuthenticated ? authLinks : guestLinks}
                    </Navbar.Collapse>
                    <div className="ml-auto w-50 justify-content-end"></div>
                </Navbar> */}
                <Navbar expand="sm">
                    <Navbar.Brand href="/">
                        <img className="logo-paku" src={require("./imgs/Logo.png")} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {isAuthenticated ? authLinks : guestLinks}
                    </Navbar.Collapse>
                </Navbar>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(NavMenu);
